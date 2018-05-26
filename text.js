let example = 

 `solid Octahedron_Created_by_Prototyre3D
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


let e2 = `solid op
	outer loop
	facet normal 0 0 0
	vertex 0 0 -1
	vertex 1 1 0
	vertex 1 -1 0
	endloop
	endfacet
	endsolid op`

let e3 = `solid flower
	outer loop
	facet normal 0 0 0
	vertex 0 0 0
	vertex 0 3 2
	vertex 2 3 0
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 0 0 
	vertex -2 3 0
	vertex 0 3 2
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 0 0
	vertex -2 3 0
	vertex 0 3 -2
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 0 0
	vertex 0 3 -2
	vertex 2 3 0
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 3 2
	vertex 2 3 0
	vertex 4 3 4
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex -2 3 0
	vertex 0 3 2
	vertex -4 3 4
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 0 3 -2
	vertex -2 3 0
	vertex -4 3 -4
	endloop
	endfacet

	facet normal 0 0 0
	outer loop
	vertex 2 3 0
	vertex 0 3 -2
	vertex 4 3 -4
	endloop
	endfacet
	endsolid flower`
