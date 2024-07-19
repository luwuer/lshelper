This is a utility library for local storage where you can measure the number of bytes that can be stored, the number of bytes already used, and the remaining bytes in the browser's local storage.

### Install

```bash
pnpm i lshelper
```

### Usage

```ts
import { stat } from 'lshelper';

const statRet = stat()
// statRet
// {
//     "total": 10485760,
//     "used": 0,
//     "free": 10485760,
//     "usedKey": 0,
//     "usedContent": 0
// }

console.log(`
    Max size: ${statRet.total / 1024 / 1024}Mb\n
    Used size: ${statRet.used / 1024 / 1024}Mb\n
    Free size: ${statRet.free / 1024 / 1024}Mb\n
    Used rate: ${(statRet.used / statRet.total) * 100}%\n
    Key size: ${statRet.usedKey / 1024}Kb\n
    Content size: ${statRet.usedContent / 1024}Kb\n
`)
```

### Usage by CDN
```html
<script src="https://cdn.jsdelivr.net/npm/lshelper/dist/lshelper.umd.cjs"></script>

<script>
const statRet = LsHelper.stat()

console.log(`
    Max size: ${statRet.total / 1024 / 1024}Mb\n
    Used size: ${statRet.used / 1024 / 1024}Mb\n
    Free size: ${statRet.free / 1024 / 1024}Mb\n
    Used rate: ${(statRet.used / statRet.total) * 100}%\n
    Key size: ${statRet.usedKey / 1024}Kb\n
    Content size: ${statRet.usedContent / 1024}Kb\n
`)
</script>
```