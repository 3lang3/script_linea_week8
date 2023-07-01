# Linea 第八周脚本

- 总共 17 个dapp，可以拿到 255分左右，部分任务银河确认较慢可能要隔天才能verify
- 这一期应该是除kyc外权重最大的一期了，大家加油！
- 目前链上Gas被卡，跑完全部任务，每个钱包需要准备 `25eth` 的测试币 (gas为2500gwei时)

## 须知

**请一定进行代码审计，我开源的代码这么多双眼睛盯着还好，如果私下收到的代码切勿随意运行，很细微的改动都有可能导致私钥丢失.**

## 🤲 拜托

- 关注本人推特 [@0x3lang](https://twitter.com/0x3lang)，会不定期开源脚本

> 请自行检查代码，和项目依赖，风险自担，可以自行修改。

## 环境

- nodejs [lts](https://nodejs.org/en/download) 👉[教程戳这里](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025597810528)

## 安装依赖

```bash
npm i -g pnpm # 安装pnpm 
pnpm install # 安装依赖
```

> 这期使用 pnpm 工具原因是上期部分windows用户反馈使用npm安装依赖失败

## 运行

根目录新建 `keys.txt` 放私钥，一行一个

```bash
pnpm task # 开跑！
```

支持并发运行，例如：

```bash
pnpm task -b 10 # 例如100个私钥，分十份并发跑，节省时间
```
