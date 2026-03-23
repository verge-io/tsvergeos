[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/vm-recipe

# services/vm-recipe

VM recipe service registration module.

Importing this module registers the [VMRecipeService](#vmrecipeservice) on [VergeClient](../index.md#vergeclient),
making `client.vmRecipes` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/vm-recipe';
```

## Classes

### VMRecipeService

Defined in: [services/vm-recipe/service.ts:47](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L47)

Service for managing VergeOS VM recipes.

VM recipes are marketplace templates for deploying virtual machines.
They are managed by the catalog system — create is not supported via
the SDK. This service supports listing, getting, updating, deleting,
and deploying recipes.

Recipe keys are 40-character hex strings (not integers).

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/vm-recipe';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all VM recipes
const recipes = await client.vmRecipes.list();

// Get questions for a recipe
const questions = await client.vmRecipes.getQuestions(recipes[0].$key);

// Deploy a recipe
await client.vmRecipes.deploy(recipes[0].$key, {
  name: 'my-vm',
  answers: { hostname: 'my-vm', ram: 4096 },
});

// Download a recipe from catalog
await client.vmRecipes.download(recipes[0].$key);
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`VMRecipe`](../types.md#vmrecipe), [`VMRecipeUpdateParams`](../types.md#vmrecipeupdateparams)\>

#### Constructors

##### Constructor

> **new VMRecipeService**(`http`): [`VMRecipeService`](#vmrecipeservice)

Defined in: [services/vm-recipe/service.ts:48](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L48)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`VMRecipeService`](#vmrecipeservice)

###### Overrides

[`WritableService`](../index.md#writableservice).[`constructor`](../index.md#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](../index.md#writableservice).[`resource`](../index.md#property-resource-3) | [services/base.ts:123](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L123) |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](../index.md#writableservice).[`displayName`](../index.md#property-displayname-1) | [services/base.ts:126](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L126) |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](../index.md#writableservice).[`defaultFields`](../index.md#property-defaultfields-1) | [services/base.ts:138](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L138) |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](../index.md#writableservice).[`actionConfig`](../index.md#property-actionconfig) | [services/base.ts:256](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L256) |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`VMRecipe`](../types.md#vmrecipe)[]\>

Defined in: [services/base.ts:157](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L157)

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`VMRecipe`](../types.md#vmrecipe)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`VMRecipe`](../types.md#vmrecipe)\>

Defined in: [services/base.ts:174](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L174)

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`VMRecipe`](../types.md#vmrecipe)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`VMRecipe`](../types.md#vmrecipe)\>

Defined in: [services/base.ts:198](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L198)

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`VMRecipe`](../types.md#vmrecipe)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`VMRecipe`](../types.md#vmrecipe)\>

Defined in: [services/base.ts:217](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L217)

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`VMRecipe`](../types.md#vmrecipe)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`VMRecipe`](../types.md#vmrecipe)\>

Defined in: [services/base.ts:293](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L293)

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`VMRecipeUpdateParams`](../types.md#vmrecipeupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`VMRecipe`](../types.md#vmrecipe)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](../index.md#writableservice).[`update`](../index.md#update)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: [services/base.ts:309](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L309)

Delete a resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to delete |

###### Returns

`Promise`\<`void`\>

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`delete`](../index.md#delete)

##### inlineAction()

> `protected` **inlineAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:330](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L330)

Execute an inline action on a specific resource.

Sends a POST to `/{resource}/{key}/{action}` with optional body params.
Used for record-level actions (e.g., `POST /users/3/enable`).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to act on |
| `action` | `string` | The action name (e.g., `'enable'`, `'disable'`) |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`WritableService`](../index.md#writableservice).[`inlineAction`](../index.md#inlineaction)

##### dispatchAction()

> `protected` **dispatchAction**(`action`, `key`, `params?`): `Promise`\<`void`\>

Defined in: [services/base.ts:356](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/base.ts#L356)

Dispatch an action to the dedicated `_actions` endpoint.

Sends a POST to `/{actionEndpoint}` with the body:
```json
{ "[actionKey]": key, "action": actionName, "params": { ... } }
```

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `action` | `string` | The action name (e.g., `'poweron'`, `'poweroff'`) |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to act on |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`WritableService`](../index.md#writableservice).[`dispatchAction`](../index.md#dispatchaction)

##### getQuestions()

> **getQuestions**(`key`): `Promise`\<[`RecipeQuestion`](../types.md#recipequestion)[]\>

Defined in: [services/vm-recipe/service.ts:62](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L62)

Get the questions defined for a VM recipe.

Questions define the input fields shown when deploying the recipe.
Uses the shared `/recipe_questions` endpoint with a filter on the
recipe FK reference string.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<[`RecipeQuestion`](../types.md#recipequestion)[]\>

Array of recipe questions

##### getSections()

> **getSections**(`key`): `Promise`\<[`RecipeSection`](../types.md#recipesection)[]\>

Defined in: [services/vm-recipe/service.ts:78](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L78)

Get the sections defined for a VM recipe.

Sections group questions together in the recipe deployment form.
Uses the shared `/recipe_sections` endpoint with a filter on the
recipe FK reference string.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<[`RecipeSection`](../types.md#recipesection)[]\>

Array of recipe sections

##### deploy()

> **deploy**(`key`, `options`): `Promise`\<`void`\>

Defined in: [services/vm-recipe/service.ts:93](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L93)

Deploy a VM recipe, creating a new recipe instance.

This creates a VM based on the recipe template with the provided
answers to recipe questions.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |
| `options` | [`VMRecipeDeployOptions`](../types.md#vmrecipedeployoptions) | Deploy options including name, answers, and auto_update |

###### Returns

`Promise`\<`void`\>

##### recipeAction()

> **recipeAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: [services/vm-recipe/service.ts:119](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L119)

Dispatch an action on a VM recipe.

Valid actions: `clone`, `download`, `remove`, `republish`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |
| `action` | [`VMRecipeAction`](../types.md#vmrecipeaction) | The action to perform |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

##### download()

> **download**(`key`): `Promise`\<`void`\>

Defined in: [services/vm-recipe/service.ts:143](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L143)

Download a VM recipe from its catalog.

Convenience method that dispatches the `download` action.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<`void`\>

##### clone()

> **clone**(`key`, `params?`): `Promise`\<`void`\>

Defined in: [services/vm-recipe/service.ts:153](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L153)

Clone a VM recipe.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |
| `params?` | `Record`\<`string`, `unknown`\> | Optional clone parameters |

###### Returns

`Promise`\<`void`\>

##### remove()

> **remove**(`key`): `Promise`\<`void`\>

Defined in: [services/vm-recipe/service.ts:162](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L162)

Remove a VM recipe.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<`void`\>

##### republish()

> **republish**(`key`): `Promise`\<`void`\>

Defined in: [services/vm-recipe/service.ts:171](https://github.com/verge-io/tsvergeos/blob/c133d655c3866a221a89ec91a350542833cb46f6/packages/sdk/src/services/vm-recipe/service.ts#L171)

Republish a VM recipe.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<`void`\>

## References

### RecipeDatabaseContext

Re-exports [RecipeDatabaseContext](../types.md#recipedatabasecontext)

***

### RecipeQuestion

Re-exports [RecipeQuestion](../types.md#recipequestion)

***

### RecipeQuestionPostprocess

Re-exports [RecipeQuestionPostprocess](../types.md#recipequestionpostprocess)

***

### RecipeQuestionType

Re-exports [RecipeQuestionType](../types.md#recipequestiontype)

***

### RecipeSection

Re-exports [RecipeSection](../types.md#recipesection)

***

### VMRecipe

Re-exports [VMRecipe](../types.md#vmrecipe)

***

### VMRecipeAction

Re-exports [VMRecipeAction](../types.md#vmrecipeaction)

***

### VMRecipeDeployOptions

Re-exports [VMRecipeDeployOptions](../types.md#vmrecipedeployoptions)

***

### VMRecipeUpdateParams

Re-exports [VMRecipeUpdateParams](../types.md#vmrecipeupdateparams)
