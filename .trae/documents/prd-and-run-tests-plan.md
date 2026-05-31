# 计划：生成 PRD 文档 + 运行测试

## 背景

用户调用了 `/plan`、`/prd`、`/run-tests 运行下` 三个命令，需要：
1. 为当前项目生成需求文档（PRD）
2. 运行测试（附加参数：`运行下`）

## 当前工作区状态

- 工作区仅包含 `.trae/` 配置目录，无应用源代码
- 无 `package.json`、无测试文件（`*.test.*` / `*.spec.*`）
- 项目结构：
  - `.trae/commands/` — 5 个命令定义文件
  - `.trae/rules/` — 3 个规则文件（commit-and-pr、general-coding、testing-and-validation）
  - `.trae/skills/` — 3 个 Skill 定义（code-review、deploy-helper、doc-writer）

## 实施步骤

### 步骤 1：生成 PRD 需求文档

- 基于当前 `.trae` 项目的 commands、rules、skills 体系，生成一份 PRD 文档
- 文档内容覆盖：
  - 项目概述：Trae 配置管理系统的定位与目标
  - 功能需求：
    - Commands 系统（命令定义、参数解析、frontmatter 规范）
    - Rules 系统（规则分类、alwaysApply 机制）
    - Skills 系统（Skill 注册、user-invocable / disable-model-invocation 控制）
  - 非功能需求：可维护性、扩展性、一致性
  - 约束与假设
- 输出文件：`.trae/documents/prd.md`

### 步骤 2：运行测试

- 检查是否存在可执行的测试框架和测试用例
- 当前工作区无测试文件，需说明：
  - 无可运行的测试模块
  - 建议后续补充的测试方向（如：命令定义的 frontmatter 校验、Skill 元数据完整性检查等）
- 附加参数 `运行下` 作为测试执行的备注信息

### 步骤 3：验证与总结

- 确认 PRD 文档已生成且内容完整
- 确认测试执行结果已记录
- 输出最终总结

## 风险与注意事项

- 当前无源代码和测试，PRD 将基于配置文件体系撰写
- 测试步骤将因无测试文件而跳过实际执行，仅输出说明
