import Agent from './Agent';

const loadAgentFile = (filePath) => {
    return new Agent(filePath);
};

export default loadAgentFile;
