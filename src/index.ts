import { readFileSync, writeFileSync } from 'fs';

if (process.argv.length > 2) {
    const IP = process.argv[2];

    const hostsLines = readFileSync('/etc/hosts', 'utf-8').split('\n').map((text) => {
        if (text.includes('socialdog')) {
            return `${IP} socialdog`;
        }
        return text;
    });
    writeFileSync('/etc/hosts', hostsLines.join('\n'));

    type ConfigLines = [string[], boolean];
    // ここは適宜書き換えましょう
    const configFilePath = '/Users/bo-yakitarako/.ssh/config';

    const [configLines] = readFileSync(configFilePath, 'utf-8')
        .split('\n').reduce(([lines, canRewrite], text) => {
            if (canRewrite && text.includes('HostName')) {
                return [[...lines, `    HostName ${IP}`], false] as ConfigLines;
            }

            // ~/.ssh/configに設定したHostの名前を含むように"socialdog"を適宜変更しましょう
            const isUpdate = canRewrite || text.includes('socialdog');
            return [[...lines, text], isUpdate] as ConfigLines;
        }, [[], false] as ConfigLines);

    writeFileSync(configFilePath, configLines.join('\n'));

    console.log(`${IP}に書き換えといたわよ`);
} else {
    console.log('引数が無い');
}
