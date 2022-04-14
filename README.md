# Behavior Log Searching API

> Maintainer: @Nixieboluo

这是一个用来搜索 Minecraft 基岩版玩家动作日志的 API，需要搭配修改版的插件和 Elasticsearch 使用。

> 插件地址：[lose-af/behavior-log](https://github.com/lose-af/behavior-log)
>
> 原作者：[YQ](https://github.com/yqs112358) ([LXL-Plugins/BehaviorLog](https://github.com/LiteLScript-Dev/LXL-Plugins/tree/main/BehaviorLog))
>
> repo 内另附配套的 Elasticsearch Mapping 和 Filebeat 配置。

## 开始使用

### 环境搭建

本项目使用 JavaScript 编写，推荐的 Node.js 版本为 16。

以下操作假定你已经完成了 Node.js 的安装以及 Yarn 包管理器的配置。

> Node.js: [nodejs.org](https://nodejs.org/)
>
> Yarn: [yarnpkg.com](https://yarnpkg.com/)

### 运行项目

1. 使用上方的 `Download ZIP` 或使用 Git 将项目下载到本地。

2. 在项目的根目录执行 `yarn` 以安装所需的依赖。

3. 进入 `/config` 目录，将 `config.example.mjs` 重命名为 `config.mjs` 并修改其中的配置（Elasticsearch 用户名 / 密码 / 证书 / 连接信息、搜索限制等）。

4. 在根目录下执行 `yarn run` 运行项目。

5. 默认配置下，项目将会监听 `3000` 端口。

### 生产配置

在生产环境中，推荐将项目放在反向代理之后运行，并配置 `HTTPS`。

## API 文档

### 请求格式

本项目只有一个端点：`POST /query`

你需要设置 Content Type 为 `application/json`

然后对其传入以下形式的内容：

```json
{
	"@timestamp": {
		"gte": "2022-04-11T02:00:00.000Z",
		"lte": "2022-04-13T09:45:00.000Z"
	},
	"subject": ["Yaasasi", "Navaja Pathera"],
	"object": null,
	"dimension": ["Overworld"],
	"locations.subject.x": {
		"gte": -1100,
		"lte": -980
	},
	"locations.subject.y": {
		"gte": -60,
		"lte": 75
	},
	"locations.subject.z": {
		"gte": -2450,
		"lte": -2300
	},
	"locations.object.x": null,
	"locations.object.y": null,
	"locations.object.z": null
}
```

#### `sort_index`

_选填项目_

从之前的请求中获取的 `sort_index` 数组，用于分页展示。

- 示例

     - ```json
       "sort_index": [1649840326467]
       ```

#### `@timestamp`

**_必填项目_**

表示查询的时间范围，采用 `ISO-8601` 格式。

你可以在配置文件的 `searching.limits.time` 项配置范围限制。

- 属性

     - `gte`：起始时间

     - `lte`：终止时间

- 限制

     - `gte` 不比当前时间之前的 `maxTimeBefore` 毫秒更早

     - `lte` 不比当前时间之前的 `minTimeBefore` 毫秒更早

     - `gte` 与 `lte` 的间隔不小于 `minDuration`

     - `lte` 不比 `gte` 更早

- 示例

     - ```json
       "@timestamp": {
       	"gte": "2022-04-11T02:00:00.000Z",
       	"lte": "2022-04-13T09:45:00.000Z"
       }
       ```

#### `subject`

**_必填项目_**

表示查询的动作发出者，使用数组形式表示。

如果要查询的项目不存在该属性，该属性的值应为 `null`。

你可以在配置文件的 `searching.limits.subject` 项配置范围限制。

- 限制

     - 数组元素数量需要大于等于 `minItems` 个

     - 数组元素数量需要小于等于 `maxItems` 个

- 示例

     - ```json
       "subject": ["Yaasasi", "Navaja Pathera"]
       ```

     - ```json
       "subject": null
       ```

#### `object`

_选填项目_

表示查询的动作接受者，使用数组形式表示。

如果要查询的项目不存在该属性，该属性的值应为 `null`。

你可以在配置文件的 `searching.limits.object` 项配置范围限制。

- 限制

     - 数组元素数量需要大于等于 `minItems` 个

     - 数组元素数量需要小于等于 `maxItems` 个

- 示例

     - ```json
       "object": ["Yaasasi", "Navaja Pathera"]
       ```

     - ```json
       "object": null
       ```

#### `dimension`

_选填项目_

表示动作发生的维度，使用数组形式表示。

如果要查询的项目不存在该属性，该属性的值应为 `null`。

- 限制

     - 数组元素必须是 `Overworld` `Nether` `End` 中的一个或多个

- 示例

     - ```json
       "dimension": ["Overworld", "End"]
       ```

     - ```json
       "dimension": null
       ```

#### `locations.subject.(x|y|z)`

**_必填项目_**

表示要查询的动作发出者的坐标范围。

如果要查询的项目不存在该属性，该属性的值应为 `null`。

你可以在配置文件的 `searching.limits.locations.subject` 项配置范围限制。

- 属性

     - `gte`：坐标范围下限

     - `lte`：坐标范围上限

- 限制

     - 三个项目的值类型必须相同，不能出现 `object` 和 `null` 混用的情况

     - `gte` 与 `lte` 的差值应大于 `minRanges` 中相应的值

     - `gte` 与 `lte` 的差值应小于 `minRanges` 中相应的值

- 示例（只展示一组）

     - ```json
       "locations.subject.x": {
       	"gte": -1100,
       	"lte": -980
       }
       ```

     - ```json
       "locations.subject.x": null
       ```

#### `locations.object.(x|y|z)`

_选填项目_

表示要查询的动作接受者的坐标范围。

如果要查询的项目不存在该属性，该属性的值应为 `null`。

你可以在配置文件的 `searching.limits.locations.object` 项配置范围限制。

- 属性

     - `gte`：坐标范围下限

     - `lte`：坐标范围上限

- 限制

     - 若不填写此项，则三项必须同时缺失

     - 三个项目的值类型必须相同，不能出现 `object` 和 `null` 混用的情况

     - `gte` 与 `lte` 的差值应大于 `minRanges` 中相应的值

     - `gte` 与 `lte` 的差值应小于 `minRanges` 中相应的值

- 示例（只展示一组）

     - ```json
       "locations.object.x": {
       	"gte": -1100,
       	"lte": -980
       }
       ```

     - ```json
       "locations.subject.x": null
       ```

### 响应格式

返回内容为过滤并加工后的 Elasticsearch 搜索结果，每次返回的最大结果数量为 `searching.limits.pageSize` 配置项的值。

结果中出现的坐标会根据 `searching.desensitizing.locations` 中的配置项被赋予随机偏移。

返回形式如下：

- 成功请求

     ```json
     {
     	"code": 2000,
     	"time_elapsed": 7,
     	"sort_index": [1649803856674],
     	"hits": {
     		"total": { "value": 1293, "relation": "eq" },
     		"hits": [
     		{
     			"_id": "WRYlIoABWjyeqlvKizTt",
     			"@timestamp": "2022-04-13T08:58:43.557Z",
     			"type": "使用物品",
     			"subject": "Navaja Pathera",
     			"object": "Composter",
     			"dimension": "Overworld",
     			"data": "类型：minecraft:composter",
     			"locations.object": { "z": null, "x": null, "y": null },
     			"locations.subject": { "x": -1043, "y": 81, "z": -2361 }
     		}
     		...
     		]
     	}
     }
     ```

- 失败请求

     ```json
     {
     	"code": 4000,
     	"reason": "Malformed request body.",
     	"description": "invalid JSON, only supports object and array"
     }
     ```

#### `code`

请求的状态码。

若值为 `2000` 则为请求成功。

其他状态码在 [`/app/core/status-codes.mjs`](./app/core/status-codes.mjs) 中有相关定义。

#### `reason`

仅会在失败请求中出现，描述了错误的简要原因。

#### `description`

仅会在失败请求中出现，是错误的补充说明。

#### `time_elasped`

搜索耗费的时间，单位为毫秒。

#### `sort_index`

返回的结果中，最后一项的索引值。

在分页搜索中需要传递此值。

#### `hits`.`total`

描述了搜索记录数量的相关信息。

- 属性

     - `value`：搜索到的总记录数

          - 当 `relation` 不为 `eq` 时，该值并不完全准确

     - `relation`：返回的 `value` 值与真实值的关系

          - 当该值为 `eq` 时，`value` 值为准确值

          - 当该值为 `gte` 时，`value` 值小于真实值

#### `hits.hits`

一个包含了搜索结果的数组。

- 属性

     - `_id`：该文档的索引 ID

     - `@timestamp`：动作发生的时间

     - `type`：动作类型

     - `subject`：动作的发出者

     - `object`：动作的接受者

     - `dimension`：动作发生的维度

     - `data`：动作的元数据

     - `locations.subject`：动作发出者的坐标对象，其属性值可能为 `null`

     - `locations.object`：动作接受者的坐标对象，其属性值可能为 `null`
