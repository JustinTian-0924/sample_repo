# MaplePath Consulting

加拿大留学咨询公司网站练习项目，使用虚构品牌和演示数据。开发范围以计划书为准：企业展示页面、服务介绍、咨询表单和内容管理后台。

当前处于本地环境搭建阶段，项目基于 Payload Blank 模板，已有 Users 和 Media 集合。业务页面、Services、Articles 和 Leads 将逐步开发。

## 当前开发方式

网站和 Payload 后台在 Windows 本机运行，PostgreSQL 在 Docker 中运行。

| 项目 | 配置 |
| --- | --- |
| 本地 Node.js | 当前使用 22.20.0 |
| 包管理器 | npm |
| Payload | 3.90.2 |
| Next.js | 16.3.8 |
| React | 19.2.6 |
| 数据库镜像 | postgres:17-alpine |
| 本机数据库地址 | 127.0.0.1:5433 |
| 数据库名 / 用户名 | maplepath / maplepath |
| 默认网站地址 | http://localhost:3000 |
| 默认管理后台 | http://localhost:3000/admin |

版本表对应 `package.json` 中的目标配置。修改依赖声明后，需要完成安装并更新 `package-lock.json`，实际安装版本才会同步。

`docker-compose.yml` 负责本项目的 PostgreSQL，包含健康检查和持久化数据卷。本阶段网站通过 `npm.cmd run dev` 启动。模板自带的 Dockerfile 尚未适配和验证，完整应用容器化安排在后续部署阶段。

## 首次本地启动

以下命令均由开发者在项目根目录的 PowerShell 中手动执行。每一步成功后再继续；任何一步报错，先保留错误输出。

### 1. 安装依赖

```powershell
npm.cmd install
```

安装成功后应生成 `package-lock.json`，并存在 `node_modules/.bin/next.cmd`。项目目录或 `node_modules` 已存在，并不能单独证明依赖安装完成。保留并提交 `package-lock.json`，用于记录实际依赖版本。

### 2. 检查环境变量

当前本地 `.env` 已保留脚手架生成的 `PAYLOAD_SECRET`，数据库连接配置与 Compose 一致，无需重新复制。

以后在另一台电脑首次搭建时，仅在 `.env` 不存在的情况下复制示例：

```powershell
Copy-Item -LiteralPath '.env.example' -Destination '.env'
```

示例中的本地数据库配置为：

```dotenv
DATABASE_URL=postgresql://maplepath:maplepath_dev_only@127.0.0.1:5433/maplepath
POSTGRES_PASSWORD=maplepath_dev_only
PAYLOAD_SECRET=YOUR_SECRET_HERE
```

如果使用新复制的示例文件，手动运行下面的命令生成密钥，并将输出填写到 `.env` 的 `PAYLOAD_SECRET` 中。已有随机密钥时保留原值。

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

`POSTGRES_PASSWORD` 用于首次初始化数据库，必须与 `DATABASE_URL` 中的密码一致。示例密码仅用于本地练习。数据库已有数据后，修改环境变量不会自动修改数据库用户的密码。

`.env` 已被 Git 忽略；仓库保留不含实际 Payload 密钥的 `.env.example`。

### 3. 启动并验证数据库

先打开 Docker Desktop，等待 Linux 引擎启动，再执行：

```powershell
docker compose up -d --wait postgres
docker compose ps
```

首次运行会下载 PostgreSQL 镜像并创建数据库。成功标准是 `postgres` 显示 `healthy`，端口映射为 `127.0.0.1:5433->5432/tcp`。

可进一步执行一条 SQL，验证数据库名和用户：

```powershell
docker compose exec postgres psql -U maplepath -d maplepath -c "SELECT current_database(), current_user;"
```

两列结果都应为 `maplepath`。该检查验证容器内的数据库访问；本机网站的连接将在下一步验证。

### 4. 启动网站

```powershell
npm.cmd run dev
```

保持这个终端运行。看到服务就绪后，按终端显示的 Local 地址访问网站；默认是：

- 首页：http://localhost:3000
- 管理后台：http://localhost:3000/admin

首次访问 `/admin` 时创建本地管理员，随后应能进入后台并看到 Users 和 Media。开发模式下，Payload 的 PostgreSQL 适配器会根据集合配置管理数据库表结构。

如果 3000 端口已被占用，以终端输出的实际端口为准；后续浏览器自动化测试默认使用 3000，需要在执行测试前统一端口。

## 本阶段手动验收

1. npm 安装成功，存在 `package-lock.json` 和 Next.js 启动命令文件。
2. PostgreSQL 容器健康，SQL 检查返回正确的数据库名和用户。
3. 首页和 `/admin` 能加载，终端没有数据库连接错误。
4. 能创建管理员，退出后用同一账户重新登录。
5. 停止并重新启动网站和数据库后，同一管理员仍能登录，验证数据持久化。

以上操作需要实际执行后才能判定通过。文件配置完成不等于构建、测试或运行验证通过。

## 停止和再次启动

网站：在运行 `npm.cmd run dev` 的终端按 `Ctrl+C`。

数据库：在本项目目录执行：

```powershell
docker compose stop postgres
```

此操作保留数据库数据。下次开发时执行：

```powershell
docker compose up -d --wait postgres
npm.cmd run dev
```

## 常见问题

- **npm 安装失败**：保留错误输出，先解决安装问题，再启动网站；无需重新运行脚手架。
- **找不到 next 命令**：检查依赖安装是否完成，以及终端是否位于包含 `package.json` 的目录。
- **数据库不健康或无法启动**：运行 `docker compose logs --tail 80 postgres` 查看日志。
- **5433 端口已被占用**：需要同时调整 Compose 的本机端口与 `.env` 中 `DATABASE_URL` 的端口。
- **数据库密码错误**：核对 `.env` 中两处密码；已初始化的数据卷使用的是初始化时的密码。
- **连接被拒绝**：确认容器健康，并检查本机应用使用的地址是 `127.0.0.1:5433`。

### Windows 下 SWC 加载失败

如果日志先显示 `Ready`，随后出现 `not a valid Win32 application` 和 `native bindings are not available`，需要看最后的错误：开发服务器可能已经退出，因此浏览器会显示连接被拒绝。

本项目的一次本地排查发现，`@next/swc-win32-x64-msvc` 的二进制文件被截断。文件架构是 Windows x64，但实际长度小于其内部记录所需的长度。仅确认依赖目录存在不足以发现这种问题。

对于已经确认的依赖文件损坏，如果锁文件完整，先停止本项目正在运行的开发服务器，然后在项目根目录按锁文件完整重装：

```powershell
npm.cmd ci --include=optional
```

`npm ci` 会重建本项目的 `node_modules`，沿用 `package-lock.json` 中的版本，不修改源代码、环境变量或 Docker 数据卷。项目已有的 `.npmrc` 会沿用安装时的依赖解析设置。

如果 `npm ci` 报 `Invalid Version`，先按下方的锁文件恢复步骤处理；安装失败后不要继续运行编译器或网站验证。

安装成功后，单独验证原生编译器能否加载：

```powershell
node -e "require('@next/swc-win32-x64-msvc'); console.log('SWC native load OK')"
```

看到 `SWC native load OK` 后，再执行：

```powershell
npm.cmd run dev
```

确认终端持续运行，并实际访问首页和 `/admin`。如果加载检查仍失败，保留完整错误，再排查文件完整性和 Windows 运行库；不要重复初始化项目。

### 锁文件缺少版本号导致 Invalid Version

本项目的一次本地排查发现，锁文件中的 `es-abstract`、`happy-dom`、`lodash` 和 `react-datepicker/node_modules/date-fns` 条目缺少 `version`，对应的部分安装目录也不完整。npm 在处理依赖树时抛出了 `Invalid Version`，因此尚未进入替换损坏 SWC 文件的安装阶段。

对于这种已确认的锁文件损坏，按以下顺序恢复：

1. 停止本项目的开发服务器。
2. 在项目目录外创建一个新的备份目录，例如在项目的同级目录创建 `maplepath-deps-backup-日期时间`；如果该目录已存在，换一个新名称。
3. 将本项目的 `node_modules` 和 `package-lock.json` 移入该备份目录，保留原始文件以便后续比较。两个移动操作都成功后再继续。
4. 在包含 `package.json` 的项目根目录重新安装：

```powershell
npm.cmd install --include=optional
```

这会重新生成依赖目录和锁文件。`package.json` 中固定的 Payload、Next.js 和 React 版本保持不变；使用版本范围的依赖及间接依赖可能重新解析到不同版本。新锁文件完成审查和验证后再提交，备份目录不属于项目仓库。

安装成功后，执行上一节的 SWC 加载检查；看到成功提示后才启动网站。源代码、`.env` 和 PostgreSQL 数据卷无需移动或重建。不要为修复此错误直接运行 `npm audit fix --force`。

## 2026-10-14 依赖审计与更新

开发者已完成首页访问、管理员注册和重启后的数据保留验证。随后提交的 `npm audit` 报告包含 19 个受影响依赖条目；其中一些是同一底层依赖沿依赖链向上传递的告警，不代表 19 个独立业务漏洞。

依赖更新阶段只修改依赖声明与说明文档，安装、锁文件更新和验证由开发者执行。以下目标版本已核对上游公告及相关版本声明；开发者随后提交的输出已确认安装版本与表中一致：

| 依赖 | 原版本 → 目标版本 | 原因 |
| --- | --- | --- |
| next | 16.3.3 → 16.3.8 | 使用同一 16.3 系列的安全补丁 |
| eslint-config-next | 16.3.3 → 16.3.8 | 与 Next.js 版本同步 |
| sharp | 0.35.4 → 0.35.5 | 修复预编译包中 librsvg 的已知问题 |
| vitest | 4.0.18 → 4.1.11 | 更新包含修复的 @vitest/mocker |
| payload 下的 undici | 7.29.0 → 7.29.1 | 用限定父包版本的 npm override 引入安全补丁 |

Payload 及其配套包保持 `3.90.2`。当前 `@payloadcms/next` 声明接受 `>=16.3.3 <17.0.0`，所选 Next.js 版本在此范围内。上述目标依赖的 Node.js 版本要求允许当前的 `22.20.0`。

`overrides` 只针对 `payload@3.90.2` 依赖树中的 Undici，是对上游固定版本的临时替换。其他依赖可以使用自己的兼容版本；以后升级 Payload 时，重新检查其 Undici 版本并移除或调整该规则。不要通过将 Payload 降到 `3.85.1` 来规避报告，也不要将 `eslint-config-next` 降到 `14.2.35`。

### 手动安装与验证

先在网站终端按 `Ctrl+C` 停止开发服务器，保留 PostgreSQL 运行。在项目根目录逐步执行：

```powershell
npm.cmd install --include=optional
```

这里使用 `install` 同步新的依赖声明与锁文件。此时不要先运行 `npm ci`，也无需删除已有锁文件或重新初始化项目。安装失败时先保留错误输出，不继续后面的检查。

安装成功后查看实际版本和新的审计报告：

```powershell
npm.cmd ls next eslint-config-next sharp vitest @vitest/mocker undici
npm.cmd audit
```

应能看到表中的目标版本，Payload 使用的 Undici 应为 `7.29.1`。审计仍可能因下面记录的间接依赖而返回非零退出码，这与安装失败不同；保留完整输出，比较是否仍出现本次处理的 Next.js、Sharp、Vitest 或 Payload 下的 Undici。

随后逐条执行，每条成功后再继续；出现错误时保留完整输出：

```powershell
npm.cmd run lint
npm.cmd run test:int
npm.cmd run build
```

`test:int` 使用模板现有的数据库读取测试，需要 PostgreSQL 运行；该测试覆盖范围有限。`build` 检查生产构建。两者都不能替代浏览器验收。

最后启动仅监听本机的开发服务器：

```powershell
npm.cmd run dev -- --hostname 127.0.0.1
```

访问首页和 `/admin`，用原管理员账号重新登录，并在 Media 中上传一张不含私人信息的小型 PNG/JPG，确认保存后能显示图片。终端不应出现 SWC、Sharp 或数据库连接错误。

### 本地验证结果与 ESLint 配置修复

以下结果来自开发者提交的终端输出：

| 检查 | 结果 |
| --- | --- |
| 安装与依赖版本 | 成功，与目标版本一致 |
| npm audit | 13 个受影响依赖条目，5 moderate、8 high，无 critical；剩余依赖链见下节 |
| test:int | 1 个测试通过，能通过 Payload 读取 Users |
| build | 编译、TypeScript 检查和页面生成成功 |
| 首页与后台登录 | 返回成功响应，原管理员能登录 |
| Media 上传与读取 | 创建返回 201，图片文件请求返回 200 |
| lint | 原配置加载失败；下述配置修复待开发者重新验证 |

lint 的 `Converting circular structure to JSON` 错误来自配置加载阶段。模板通过 `FlatCompat` 转换 `next/core-web-vitals` 和 `next/typescript`，但已安装的 Next.js ESLint 配置本身就是 flat config 数组。现已改为直接导入 `eslint-config-next/core-web-vitals` 和 `eslint-config-next/typescript` 并展开，保留项目原有的自定义规则和生成文件忽略项。参考 [Next.js 官方 ESLint 配置示例](https://nextjs.org/docs/app/api-reference/config/eslint#with-typescript)。

本次 ESLint 修复不需要重新安装依赖。由开发者在项目根目录重新执行：

```powershell
npm.cmd run lint
```

成功标准是命令正常结束且没有 error；若只有 warning，保留输出以便确认。之前的测试和构建成功不能代替此次 lint 验证。由于只修改 ESLint 配置及本文档，本轮先重新检查 lint；出现新的问题后再决定需要补充哪些验证。

Media 的 `The following field is invalid: Alt` 对应模板中的必填 `alt` 字段，是图片替代文本，例如“演示用风景图片”。日志中随后已有创建成功与图片读取成功的响应，该次上传已完成。

### 暂未处理的间接依赖

- **braces**：审计公告当前列出的受影响版本为 `<=3.0.3`，尚无补丁。它由 Sass/Chokidar 和 ESLint/Fast-glob 等依赖链引入。本次保留告警记录，后续关注上游修复；不要将不可信用户输入作为文件匹配模式执行。
- **旧 esbuild**：本项目的 `@payloadcms/db-postgres → drizzle-kit → @esbuild-kit/esm-loader → @esbuild-kit/core-utils` 引入 `esbuild@0.18.20`。esbuild 自身已有 `>=0.25.0` 的修复，但当前审计没有提供这条依赖链的自动修复方案。漏洞涉及 esbuild 的 `serve` 功能；不要将该旧版本用于静态文件开发服务器。本次不跨越多个 `0.x` 版本强制覆盖数据库工具依赖。

这些条目仍需跟踪，不能将本次改动视为审计归零或上线验收通过。上线前重新审计并评估剩余问题。当前继续使用本机环境和演示数据开发。

修复依据：

- [Next.js 16.3.8 安全更新](https://github.com/vercel/next.js/releases/tag/v16.3.8)
- [Sharp 安全公告](https://github.com/lovell/sharp/security/advisories/GHSA-wq5f-xc86-pv6w)
- [Vitest 安全公告](https://github.com/vitest-dev/vitest/security/advisories/GHSA-82fw-gwwq-j7x9)
- [Undici 7.29.1 安全更新](https://github.com/nodejs/undici/releases/tag/v7.29.1)
- [braces 审计公告](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
- [esbuild 安全公告](https://github.com/evanw/esbuild/security/advisories/GHSA-67mh-4wv8-2f99)
- [npm overrides 说明](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides)

## 后续验证和版本管理

本阶段先完成上述依赖更新及手动验收。测试入口已改用 npm，当前模板测试仍只覆盖基础场景；`test:e2e` 所需的浏览器安装与端到端验证在后续单独安排。

如果安装报告依赖漏洞，后续使用 `npm.cmd audit` 查看涉及的依赖和修复范围，再决定升级方案。不要直接用 `npm audit fix --force` 改变已选定的依赖组合。

验收完成后，通过 GitHub Desktop 管理此目录：检查待提交文件，将更新后的 `package.json`、`package-lock.json` 和 README 一起提交，再发布仓库。`.env`、`node_modules`、`.next` 和上传文件目录不应进入提交。

下一步先建立网站导航和首页，再逐步实现服务内容、咨询表单以及后台跟进流程。

## 参考资料

- [Payload 安装说明](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL 适配器](https://payloadcms.com/docs/database/postgres)
- [PostgreSQL 官方 Docker 镜像](https://hub.docker.com/_/postgres)
- [Next.js SWC 加载问题](https://nextjs.org/docs/messages/failed-loading-swc)
- [npm ci 说明](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
