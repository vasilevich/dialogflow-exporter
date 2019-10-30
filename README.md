[![npm version](https://badge.fury.io/js/dialogflow-exporter.svg)](https://www.npmjs.com/package/dialogflow-exporter)
# dialogflow-exporter
## Install
#### YARN
```bash
yarn global add dialogflow-exporter
```
### or     
#### NPM
```bash
npm install -g dialogflow-exporter
```


## Usage
### Step 1 - get the zip file exported from dialogflow
export dialogflow .zip archive   
![how to extract dialogflow zip]instructions/extractDialogflowZip.png)

### Step 2 - use the library to convert it to a js object
put the file at the root (or anywhere you want)   
in this example my agent name is "example"   
and I put it at the root of the nodejs project:   
```
  import loadAgentFile from 'dialogflow-exporter';  
  const agent = loadAgentFile("example.zip");
  agent
    .init()
    .then((agent)=> console.log(agent.intents));
```

### Step 3
ENJOY!!


## Object methods
#####Agent  
| method      	| input           	| response                    	|
|-------------	|-----------------	|-----------------------------	|
| constructor 	| filePath:string 	| Agent object                	|
| init        	|                 	| Promise<void>               	|
| toString    	|                 	| get all the agent as string 	|

   
| property 	| type     	| description                                                                    	|
|----------	|----------	|--------------------------------------------------------------------------------	|
| intents  	| Intent[] 	| List of intents including each intent includes a name, user says, and response 	|
#####Intent  
| method    	| input                                                      	| response                                   	|
|-------------	|------------------------------------------------------------	|--------------------------------------------	|
| constructor 	| name: string, userSays: IUserSay[], responses: IResponse[] 	| Intent object                              	|
| toObject    	|                                                            	| returns normal js object instead of class  	|
| toString    	|                                                            	| returns same object in json representation 	|
   
| property 	| type        	| description                     	|
|----------	|-------------	|---------------------------------	|
| name     	| string      	| The name of this intent         	|
| userSays 	| IUserSay[]  	| Possible things an user can say 	|
| response 	| IResponse[] 	| The expected response           	|
## License
MIT see license.md file
