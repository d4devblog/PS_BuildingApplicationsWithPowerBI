Globomantics Solution
---------------------

The solution has been written using Visual Studio 2019 Community Edition.
This is available at https://visualstudio.microsoft.com/downloads/

Dependencies:
-------------
The solution will automatically download and install all dependencies (NuGet & NPM) on build.
If you have any issues with missing dependencies, then please run the npm install command 'npm install' 
from the root of the web application folder - where the package.json file resides.

Webpack:
--------
The solution uses Webpack to build/package the React.js part of the solution.
To add this to the build process you can add the 'Webpack Task Runner' extension to Visual Studio.
This is available via the Extensions Manager in VS2019 - https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner 

TypeScript:
-----------
The solution was designed & built with TypeScript Version 3.5.3
If you encounter any TypeScript issues during the build process, then please ensure that your installed 
version of TypeScript matches this version (at a minimum). 
