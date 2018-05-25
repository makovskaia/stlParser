let example = `solid Octahedron_Created_by_Prototyre3D
	outer loop
	facet normal 0 0 0
	vertex 0 0 -1
	vertex 1 1 0
	vertex 1 -1 0
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 0 -1
	vertex 1 -1 0
	vertex -1 -1 0
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 0 -1
	vertex -1 -1 0
	vertex -1 1 0
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 0 -1
	vertex -1 1 0
	vertex 1 1 0
	endloop
	endfacet
	endsolid Octahedron_Created_by_Prototyre3D`


let parseStl = (stl) => {

	let tagNames = ['solid','facet normal','outer loop', 'vertex','endloop', 'endfacet', 'endsolid'];

	//we want int if n is int, or float, rounded to 4 decimals 
	let toNum = n => Math.round(parseFloat(n) * 10000) / 10000

	let tagProps = [
		{counter: {open: 0, closed: 0}, len: 1, rule: (w) => w.length < 100 && !tagNames.includes(w)}, 
		{counter: {open: 0, closed: 0}, len: 3, rule: (w) => typeof(toNum(w)) === 'number' && Math.abs(toNum(w))<1000},
		{counter: {open: 0, closed: 0}, len: 0, rule:  (w) => true}, 
		{counter: {open: 0, closed: 0}, len: 3, rule: (w) => typeof(toNum(w)) === 'number' && Math.abs(toNum(w))<1000}];

	let validate = (word, tagI) => tagI < 3 ? tagProps[tagI].rule(word) : tagProps[6 - tagI].rule(word);

	//make stl an array of words
	let arr = stl.split(/\s+/);

	//check minimal word count
	if(arr.length < 25){
		return 'minimal word count of stl file is 25, yours has ' + arr.length;
	}

	//iterator for parseing a line
	let parse = (arrIndex, line, res) => {
		//arrIndex -index of current word in arr
		//line - data of one tag - [tag name, tag value #1, ..., tag value #n]
		//res - all tags with data - [[tag name #1, [tag values #1]], ... , [tag name #n, [tag values #n]]]

		//if arr has ended
		if(arrIndex === arr.length){
			let missingTag = null; 
			tagProps.forEach((x, i)=>{
				//counting amount of opened ang closed tags for each tag
				let a = x.counter.open, b = x.counter.closed;
				if(a !== b){
					missingTag = i;
				}
			});
			//if missing tag not null return error, else -return result
			return missingTag ? 'you have no '+ tagNames[missingTag] + ' tag' :  res;
		}

		let word = arr[arrIndex].toLowerCase();

		//if we're on the last word
		if(arrIndex === arr.length - 1){
			//if this word is not your solid name
			if(word !== res[0][1][0]){
				return "your stl shold end with your model's name ('" + res[0][1] + "')"
			}
		}

		//if our word is endfacet we need to check the number of vertexes
		if(word === 'endfacet'){
			//trianglesAmount - number of triangles, vertexAmount - num of vertexes
			let trianglesAmount = tagProps[1].counter.open;
			let vertexAmount = tagProps[3].counter.open;
			//our vertexAmount shoul be  times trianglesAmount. if not - error
			if(trianglesAmount * 3 !== vertexAmount){
				return 'you should have 3 vertices in each facet'
			}
		}

		//merge two words in case 'outer loop' or 'facet normal'
		if(word === 'outer' || word === 'facet'){
			let nextWord = arr[arrIndex+1];
			arr[arrIndex] += ' ' + arr[arrIndex+1];
			arr.splice(arrIndex + 1, 1);
			word = arr[arrIndex];
		}

		//if our word is our NAME and we're already named our model
		if(res[0] && word === res[0][1]){
			//if it is not last word in arr
			if(arrIndex !== arr.length - 1){
				 return 'you don"t use your solid name here';
			}
		}

		//if our word is tag
		if(tagNames.includes(word)){
			//counting opening and closing tags
			let k = tagNames.indexOf(word);
			//if tag in first 4 - opening
			if(k <= 3){
				//plus one opening tag
				tagProps[k].counter.open++;
			}
			//if closing
			if (k >= 3 && k < 7){
				//plus one closing tag
				tagProps[6 - k].counter.closed++;
			}

			//if we have data left from prev iter - our line is not empty and our word now is new tag (line must be added to res now)
			if(line.length > 0){
				
				let i = tagNames.indexOf(line[0]);

				//if our word is closing tag and it's not 'endsolid' and we have values in line
				if(i > 3 && i !== 6 && line[1]){
					return 'closing tag shoud not have values'
				//we make sure that it has right amount of values 
				}else{
					let requiredLen = i > 3 && i !== 6 ? 0 : tagProps[i].len, actualLen = line[1] ? line[1].length : 0;
					if(requiredLen !== actualLen){
						return 'your tag ' + line[0] + ' has wrong number of values'
					}
					//else - add line to res & clear line
					res.push(line);
					line = [];
				}
			}

			//add word to line
			line.push(word);

			//recursevely run parse with next index  
			return parse(++arrIndex , line, res);
		//expecting values here
		}else{
			//if we have no tag we can't have value
			if(line.length === 0){
				return 'you are missing a tag'
			}
			//if value is valid for our current tag
			if(validate(word, tagNames.indexOf(line[0]))){
				//if we have no values in line, we make new array in line, else -adding to existing array
				if(line.length === 1){
					line.push([word]);
				}else{
					line[1].push(word);
				}
				//recursevely run parse with next index  
				return parse(++arrIndex, line, res);
			//if value is not valid
			}else{
				return 'invalid value'
			}
		}
	} 
	return parse(0,[],[]);
}


