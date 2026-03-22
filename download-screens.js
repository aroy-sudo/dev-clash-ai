const fs = require('fs');
const https = require('https');
const path = require('path');

const screens = [
    { name: "1_Target", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQwMWUwNjZlNGNhOTQ4ODY4Zjc4OWUxNTkzMzNkMGFjEgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "2_Choose_Path", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk2MWFmMWM5ODE1NjQ2OTZhYjc5Y2IyNTE4OWMyN2VmEgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "3_Blueprint", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2MwNWVhMmY1ZWE1YzQwZTdiMGM2YzU5MGEyNzVkNzE0EgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "4_Hub", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhlMjIwNWU4NmEyNjRlODI4NGI4ZTRkNGZjNjc3NzIwEgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "5_Roadmap", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNkZmQ3ZmNkZWI1ZDQ3NWE5OWJiNWM3NmMzZjc3OTM4EgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "6_Mock_Test", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU5ZGZmOWQxZjk3NjRiZTZhNWZjMDk1OTgzNjYyNTZkEgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "7_Choose_Difficulty", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RjYzI2YjcyMWQ5YTRjZWNiMmRiMjA2ZWVjOWU2OWJjEgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "8_Doubt_Solver", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI3YjkyODlhMTIzNjRmZjI5OGFjZmEzM2U1YjRkODk2EgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" },
    { name: "9_AI_Assessment", url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzlhNTdhOTNjNjk3NjQyMmFhYTU5ODU3ZTNhNGRmZTY5EgsSBxDkypOtywgYAZIBIwoKcHJvamVjdF9pZBIVQhM0MDA0MjU3MDQwNjM1NDAyMDM4&filename=&opi=89354086" }
];

const outDir = path.join(__dirname, 'stitch-screens');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

screens.forEach(screen => {
    const file = fs.createWriteStream(path.join(outDir, `${screen.name}.html`));
    https.get(screen.url, response => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            // handle redirects
            https.get(response.headers.location, redirectResponse => {
                redirectResponse.pipe(file);
            })
        } else {
             response.pipe(file);
        }
       
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${screen.name}`);
        });
    });
});
