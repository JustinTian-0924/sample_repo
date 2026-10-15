# MaplePath Consulting

加拿大留学咨询公司网站练习项目，使用虚构品牌和演示数据。开发范围以计划书为准：企业展示页面、服务介绍、咨询表单和内容管理后台。

项目基于 Payload Blank 模板，已有 Users 和 Media 集合。本地环境、管理员与媒体管理、公共导航和首页已由开发者验收并提交。本轮新增留学、签证、移民信息三个独立页面，等待开发者运行检查；Services、Articles 和 Leads 将逐步开发。

完整的已完成功能清单、页面状态及开发路线图见 [项目进度文档](docs/PROJECT_STATUS.md)。

## 当前开发方式

网站和 Payload 后台在 Windows 本机运行，PostgreSQL 在 Docker 中运行。

| 项目 | 配置 |
| --- | --- |
| 本地 Node.js | 当前使用 22.20.0 |
| 包管理器 | npm |
| Payload | 3.90.2 |
| Next.js | 16.3.8 |
| React | 19.2.6 |
| Tailwind CSS | 4.3.3 |
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
| lint | 配置修复后开发者已验证：0 errors、5 warnings；本轮新增页面需重新检查 |

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

## 第二阶段：公共导航与首页（已验收）

开发者已确认本阶段成功验收并提交代码。以下保留实现说明和首次安装步骤；最新待验收内容见下一节的独立服务页面。

项目目录现为 `C:\commission\commision_sample_repo\sample_repo`。文件夹名称与 `package.json` 中的包名可以不同；npm 命令需要在包含 `package.json` 的目录中执行。

### 本轮实现范围

- 蓝白配色、中文首页标题与页面描述、本地 SVG 校园插画。
- 共享品牌标志、顶部导航和页脚；移动端菜单可展开、收起，按 Escape 关闭并将焦点返回按钮。
- 留学、签证、移民信息三类服务概览，五步流程、服务理念、六条原生可折叠问答和咨询准备清单。
- 跳到正文入口、键盘焦点样式、锚点滚动偏移，以及减少动态效果的系统偏好支持。
- Tailwind CSS 的 PostCSS 配置、本地 shadcn 风格 Button、样式合并工具和组件目录配置。

首页初版的服务导航使用 `/#study` 等区块链接，现已在下一阶段升级为独立服务页面。咨询入口仍通向准备清单，不会提交或保存咨询记录；Leads 集合和服务端表单验证属于后续阶段。资讯文章也将在 Articles 集合接入后实现。

首页使用静态演示内容，不再根据后台登录状态显示管理员邮箱。公共布局位于 `(frontend)` 路由组，后台继续使用独立的 `(payload)` 布局。品牌和插画为项目本地内容，不依赖远程图片或字体下载。

| 文件 | 负责内容 |
| --- | --- |
| `src/app/(frontend)/layout.tsx` | 页面语言、元信息、导航、正文和页脚 |
| `src/app/(frontend)/page.tsx` | 首页各区块的组合 |
| `src/app/(frontend)/styles.css` | Tailwind 入口、蓝白主题及响应式布局 |
| `src/components/site/site-header.tsx` | 导航与移动菜单交互 |
| `src/components/site/site-footer.tsx` | 页脚及使用说明 |
| `src/components/site/campus-illustration.tsx` | 本地校园插画 |
| `src/components/site/icons.tsx` | 品牌标志与图标 |
| `src/components/ui/button.tsx` | 可复用按钮，可用 `asChild` 渲染链接 |
| `src/lib/site-content.ts` | 导航、服务、流程与问答的静态数据 |
| `src/lib/utils.ts` | 合并 Tailwind 类名 |
| `postcss.config.mjs` / `components.json` | Tailwind 与后续 shadcn 组件配置 |
| `tests/e2e/frontend.e2e.spec.ts` | 新版首页、导航、问答与移动布局测试 |

### 开发者手动运行

先在运行网站的终端按 `Ctrl+C`。以下命令逐步执行，安装或检查失败时保留错误输出：

```powershell
Set-Location 'C:\commission\commision_sample_repo\sample_repo'
npm.cmd install --include=optional
npm.cmd run lint
npm.cmd run build
```

本轮新增了 UI 依赖，需要先 `install` 更新锁文件，再执行检查。无需运行 shadcn 初始化命令，也不要先用旧锁文件执行 `npm ci`。依赖安装后可重新执行 `npm.cmd audit`，将新结果与此前的 13 项告警比较。

本轮修改后，助手未运行安装、lint、构建、测试或浏览器预览；代码写入不代表已通过验证。此前的测试通过记录仅对应当时的代码。

检查完成后启动网站，PostgreSQL 按此前的方式保持运行，以便回归后台：

```powershell
docker compose up -d --wait postgres
npm.cmd run dev -- --hostname 127.0.0.1
```

### 浏览器验收清单

1. 打开 `http://127.0.0.1:3000`，看到 MaplePath 蓝白首页、主标题和校园插画，无远程图片加载错误。
2. 在桌面宽度点击每个导航、服务咨询入口、页脚链接和“回到顶部”，应到达对应区块，标题不被固定导航遮挡。
3. 使用浏览器设备模式检查 390px 宽度，再检查 320px 宽度：没有横向滚动，服务卡片改为单列，流程改为纵向。
4. 手机宽度下展开菜单，选择链接后自动收起；重新展开后按 Escape，可收起并把焦点返回菜单按钮。
5. 点击常见问题能展开、收起答案；用 Tab / Shift+Tab 导航，按钮和链接有清晰的焦点标记。
6. 用未登录窗口打开首页，仍能浏览完整内容；页面不展示管理员邮箱。
7. 打开 `/admin`，使用已有管理员登录，确认 Users、Media 和已上传图片仍可访问。
8. 咨询入口当前只展示准备清单，不应出现“提交成功”或创建咨询记录的提示。

### 可选：只运行本轮前端自动化测试

首次使用 Playwright 时，由开发者安装 Chromium：

```powershell
npx.cmd playwright install chromium
```

随后执行：

```powershell
npm.cmd run test:e2e:frontend
```

这条命令运行公开页面测试，当前已覆盖首页、独立服务页、返回首页区块、问答开合、移动菜单和横向溢出检查，不运行创建测试用户的后台测试。Playwright 会复用 `127.0.0.1:3000` 上已启动的服务器；未启动时按配置启动本项目的开发服务器。端口需保持为 3000。

测试失败时保留终端输出与生成的报告，先定位原因；不要通过跳过断言或关闭检查来让测试通过。

验收后在 GitHub Desktop 查看变更，将新的配置、源码、README、测试和更新后的 `package-lock.json` 一起提交。提交信息可用 `feat: add responsive homepage and navigation`，再 Push origin。

UI 配置参考：[Tailwind CSS / Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)、[shadcn 手动安装](https://ui.shadcn.com/docs/installation/manual)。

## 第三阶段：独立服务页面（本轮待验收）

本轮新增 `/study`、`/visa` 和 `/immigration`。三个页面共用详情模板，分别展示服务范围、咨询准备、三条常见问题、官方信息链接和其他服务入口。顶部导航及页脚的三个服务链接、首页服务卡片均已连接到新页面；当前服务的顶部导航会高亮。

关于我们与首页常见问题仍跳回首页对应区块。咨询准备仍是阅读用清单，没有提交表单。本轮不修改数据库结构、不新增依赖；代码写入后未由助手运行任何检查、测试或网站启动命令。

| 文件 | 用途 |
| --- | --- |
| `src/app/(frontend)/study/page.tsx` | 留学页面路由、标题和描述 |
| `src/app/(frontend)/visa/page.tsx` | 签证页面路由、标题和描述 |
| `src/app/(frontend)/immigration/page.tsx` | 移民信息页面路由、标题和描述 |
| `src/components/site/service-detail-page.tsx` | 三个页面共用的布局 |
| `src/components/site/faq-list.tsx` | 首页及详情页共用问答组件 |
| `src/lib/service-pages.ts` | 三个页面的静态演示内容和官方链接 |
| `docs/PROJECT_STATUS.md` | 功能清单、当前状态与后续路线图 |

这样安排便于学习：路由文件决定“哪个地址显示什么”，详情模板决定“页面怎么排列”，数据文件决定“页面展示哪些文字”。后续接入 CMS 时可以保留布局，逐步替换内容来源。

### 运行与检查

先停止正在运行的开发服务器，避免同时构建和开发时写入 `.next`。在项目根目录逐条执行，任何一步失败时先保留输出：

```powershell
Set-Location 'C:\commission\commision_sample_repo\sample_repo'
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e:frontend
```

沿用上一阶段已安装的依赖，无需重新安装。若上一阶段没有安装 Playwright Chromium，先按上一节的说明安装浏览器。

本轮前端测试新增了三条路由的直接访问、刷新、页面标题、当前导航状态、准备清单锚点、问答展开，以及首页卡片、面包屑返回和 320px 布局检查。官方链接只检查链接属性，不在自动化测试中访问外部网站。这些新增测试尚未执行。

检查结束后启动本地网站；如数据库未运行，先打开 Docker Desktop 并启动它：

```powershell
docker compose up -d --wait postgres
npm.cmd run dev -- --hostname 127.0.0.1
```

### 手动验收

1. 分别直接访问 `http://127.0.0.1:3000/study`、`/visa`、`/immigration`，刷新仍能加载，标签页标题正确。
2. 首页三张服务卡片、顶部导航和页脚进入对应详情页；当前服务在顶部导航高亮。
3. 从详情页进入“关于我们”“常见问题”或“咨询准备”，能回到首页的对应区块；面包屑“首页”能返回首页顶部。
4. 详情页四个导览链接分别定位到服务范围、准备清单、常见问题和官方信息，标题不被顶部导航遮住。
5. 三个页面的问答均能开合，其他服务入口能互相跳转，官方链接在新标签页打开。
6. 在 390px 和 320px 宽度下确认没有横向滚动；菜单可收起，内容和按钮可阅读、可点击。
7. 回归首页问答和 `/admin` 登录，确认原有 Users、Media 和图片仍可访问。

本轮资料入口已核对加拿大政府的 [学习许可](https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html)、[指定学习机构](https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html)、[移民信息](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html)及[代表资格核查](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative/choose/authorized.html)页面。站内不复制具体资格、费用或处理时长；访问者应以官方页面的最新说明为准。

验收后用 GitHub Desktop 提交代码和文档，提交信息可用 `feat: add service pages and project roadmap`，再 Push origin。

## 后续验证和版本管理

先完成本轮独立服务页面的构建、前端测试及手动验收。`test:e2e:frontend` 只覆盖公开页面；完整 `test:e2e` 仍包含模板后台测试，需要另行验证。

如果安装报告依赖漏洞，后续使用 `npm.cmd audit` 查看涉及的依赖和修复范围，再决定升级方案。不要直接用 `npm audit fix --force` 改变已选定的依赖组合。

验收完成后，通过 GitHub Desktop 管理此目录：检查待提交文件，将更新后的 `package.json`、`package-lock.json` 和 README 一起提交，再发布仓库。`.env`、`node_modules`、`.next` 和上传文件目录不应进入提交。

下一步补齐关于、联系与隐私说明页面，然后实现咨询提交、服务端验证、Leads 管理和跟进状态。完整顺序与验收目标见 [项目路线图](docs/PROJECT_STATUS.md#后续路线图)。

## 参考资料

- [Payload 安装说明](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL 适配器](https://payloadcms.com/docs/database/postgres)
- [PostgreSQL 官方 Docker 镜像](https://hub.docker.com/_/postgres)
- [Next.js SWC 加载问题](https://nextjs.org/docs/messages/failed-loading-swc)
- [npm ci 说明](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
