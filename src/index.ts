import Cli from './server/Cli';

(async () => {
    const cli = new Cli();
    await cli.startCli();
})();
