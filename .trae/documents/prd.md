# PRD：Trae 配置管理系统

## 1. 项目概述

### 1.1 定位

Trae 配置管理系统是一套面向 AI 辅助开发环境的声明式配置框架，通过 Markdown + YAML Frontmatter 的方式定义命令（Commands）、规则（Rules）和技能（Skills），为 AI 编码助手提供结构化的行为约束与能力扩展机制。

### 1.2 目标

- 提供统一的、声明式的配置方式，让用户能快速定义 AI 助手的行为边界与能力
- 支持命令快捷调用、规则自动应用、技能按需加载三种核心扩展模式
- 保证配置的可读性、可维护性和可扩展性

### 1.3 目标用户

- 使用 Trae IDE 的开发者
- 需要定制 AI 助手行为的团队
- 负责项目规范管理的技术负责人

---

## 2. 功能需求

### 2.1 Commands 系统

Commands 是用户可快捷调用的命令模板，通过 `/` 前缀触发。

#### 2.1.1 命令定义规范

- 命令文件存放于 `.trae/commands/` 目录，每个 `.md` 文件定义一个命令
- 文件名即命令标识，用户通过文件名匹配调用

#### 2.1.2 Frontmatter 结构

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 否 | 命令的显示名称，缺失时以文件名代替 |
| `description` | 否 | 命令的简要描述，用于帮助信息展示 |

**Frontmatter 变体支持：**

- 完整 frontmatter（name + description）
- 仅 name
- 仅 description
- 空 frontmatter（`---\n---`）
- 无 frontmatter（纯正文）

#### 2.1.3 参数机制

| 占位符 | 说明 |
|--------|------|
| `$1`, `$2`, ... | 位置参数，按顺序从用户输入中提取 |
| `$ARGUMENTS` | 剩余参数，包含所有未分配给位置参数的内容 |

#### 2.1.4 现有命令清单

| 命令文件 | name | description | 参数 |
|----------|------|-------------|------|
| `run-tests.md` | run-tests | 运行指定模块的测试并可附带额外参数 | `$1`（模块）、`$2`（过滤关键字）、`$ARGUMENTS` |
| `description-only.md` | — | 只有 description 的命令示例 | `$ARGUMENTS` |
| `name-only.md` | name-only-command | 只有 name 的命令示例 | `$1`、`$2` |
| `empty-frontmatter.md` | — | 空 frontmatter 的 case | `$1`、`$ARGUMENTS` |
| `no-frontmatter.md` | — | 无 frontmatter 的 case | `$1`、`$2`、`$ARGUMENTS` |

### 2.2 Rules 系统

Rules 是自动注入 AI 上下文的规则指令，无需用户显式调用。

#### 2.2.1 规则定义规范

- 规则文件存放于 `.trae/rules/` 目录，每个 `.md` 文件定义一条规则
- 规则内容为 Markdown 格式的行为约束文本

#### 2.2.2 Frontmatter 结构

| 字段 | 必填 | 说明 |
|------|------|------|
| `alwaysApply` | 否 | 布尔值，为 `true` 时规则始终自动注入 AI 上下文 |

#### 2.2.3 应用机制

- `alwaysApply: true` 的规则在每次 AI 对话中自动加载
- 未设置 `alwaysApply` 或为 `false` 的规则需通过其他方式按需引用

#### 2.2.4 现有规则清单

| 规则文件 | alwaysApply | 核心内容 |
|----------|-------------|----------|
| `commit-and-pr.md` | true | 提交信息使用祈使句、一类改动一提交、PR 描述规范、破坏性变更迁移方案 |
| `general-coding.md` | true | 可读性优先、遵循原项目风格、避免无关重构、注释解释"为什么"、处理边界条件 |
| `testing-and-validation.md` | true | 改动后运行检查、修复缺陷补充测试用例、关键路径给出验证步骤、不提交失败构建 |

### 2.3 Skills 系统

Skills 是可被 AI 助手按需调用的能力模块，提供特定领域的专业能力。

#### 2.3.1 技能定义规范

- 技能文件存放于 `.trae/skills/<skill-name>/SKILL.md`
- 每个技能是一个独立目录，以 `SKILL.md` 为入口

#### 2.3.2 Frontmatter 结构

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 技能名称，用于调用匹配 |
| `description` | 是 | 技能描述，用于技能发现与展示 |
| `user-invocable` | 否 | 布尔值，是否允许用户直接调用（默认 false） |
| `disable-model-invocation` | 否 | 布尔值，是否禁止 AI 自主调用（默认 false） |

#### 2.3.3 调用控制矩阵

| user-invocable | disable-model-invocation | 行为 |
|----------------|--------------------------|------|
| true | false | 用户可直接调用，AI 也可自主调用 |
| false | false | 仅 AI 可自主调用，用户不可直接触发 |
| true | true | 仅用户可调用，AI 不可自主调用 |
| false | true | 双方均不可调用（禁用状态） |

#### 2.3.4 现有技能清单

| 技能目录 | name | user-invocable | disable-model-invocation | 功能 |
|----------|------|----------------|--------------------------|------|
| `code-review/` | code-review | true | false | 静态审查变更，输出风险点、可维护性建议、修复示例 |
| `doc-writer/` | doc-writer | true | false | 读取需求，生成简洁文档草稿 |
| `deploy-helper/` | deploy-helper | false | true | 根据服务名和环境生成部署 checklist（当前禁用） |

---

## 3. 非功能需求

### 3.1 可维护性

- 所有配置文件使用 Markdown + YAML Frontmatter 格式，降低学习成本
- 每个命令/规则/技能独立成文件，便于单独修改和版本管理
- 目录结构清晰，按类型分目录（commands / rules / skills）

### 3.2 扩展性

- 新增命令只需在 `.trae/commands/` 下添加 `.md` 文件
- 新增规则只需在 `.trae/rules/` 下添加 `.md` 文件
- 新增技能只需在 `.trae/skills/` 下创建目录并添加 `SKILL.md`
- Frontmatter 字段可按需扩展，不影响已有配置

### 3.3 一致性

- 所有配置文件遵循统一的 Frontmatter 规范
- 参数占位符命名一致（`$1`、`$2`、`$ARGUMENTS`）
- 技能目录命名与 `name` 字段保持一致

### 3.4 容错性

- Frontmatter 字段缺失时应有合理降级（如 name 缺失用文件名）
- 空 frontmatter 和无 frontmatter 的文件均应正常解析
- 禁用状态的技能不应导致系统错误

---

## 4. 约束与假设

### 4.1 约束

- 配置文件必须为 Markdown 格式（`.md` 后缀）
- Frontmatter 必须使用 YAML 格式，以 `---` 分隔
- 技能必须以目录形式组织，入口文件固定为 `SKILL.md`
- 参数占位符仅支持 `$1`-`$9` 位置参数和 `$ARGUMENTS` 剩余参数

### 4.2 假设

- 用户具备基本的 Markdown 和 YAML 知识
- AI 助手能正确解析 Frontmatter 并按规则注入上下文
- 命令调用时用户会提供足够的参数，缺失参数由 AI 自行处理或提示

---

## 5. 后续规划建议

- 增加命令/规则/技能的版本管理机制
- 支持规则的按条件触发（如仅对特定文件类型生效）
- 增加技能的依赖声明与自动加载
- 提供配置校验工具，检测 Frontmatter 格式错误和字段缺失
- 支持团队级配置继承与覆盖
