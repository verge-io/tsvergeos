[**tsvergeos**](../README.md)

***

[tsvergeos](../README.md) / services/tenant-recipe

# services/tenant-recipe

Tenant recipe service registration module.

Importing this module registers the [TenantRecipeService](#tenantrecipeservice) on [VergeClient](../index.md#vergeclient),
making `client.tenantRecipes` available. This is a side-effect import:

```typescript
import 'tsvergeos/services/tenant-recipe';
```

## Classes

### TenantRecipeService

Defined in: services/tenant-recipe/service.ts:43

Service for managing VergeOS tenant recipes.

Tenant recipes are marketplace templates for deploying tenants.
They are managed by the catalog system — create is not supported via
the SDK. This service supports listing, getting, updating, deleting,
and deploying recipes.

Recipe keys are 40-character hex strings (not integers).

#### Example

```typescript
import { VergeClient } from 'tsvergeos';
import 'tsvergeos/services/tenant-recipe';

const client = await VergeClient.connect({ host: '...', apiKey: '...' });

// List all tenant recipes
const recipes = await client.tenantRecipes.list();

// Get questions for a recipe
const questions = await client.tenantRecipes.getQuestions(recipes[0].$key);

// Deploy a recipe
await client.tenantRecipes.deploy(recipes[0].$key, {
  name: 'my-tenant',
  answers: { hostname: 'my-tenant' },
});
```

#### Extends

- [`WritableService`](../index.md#writableservice)\<[`TenantRecipe`](../types.md#tenantrecipe), [`TenantRecipeUpdateParams`](../types.md#tenantrecipeupdateparams)\>

#### Constructors

##### Constructor

> **new TenantRecipeService**(`http`): [`TenantRecipeService`](#tenantrecipeservice)

Defined in: services/tenant-recipe/service.ts:44

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `http` | [`HttpClient`](../index.md#httpclient) |

###### Returns

[`TenantRecipeService`](#tenantrecipeservice)

###### Overrides

[`WritableService`](../index.md#writableservice).[`constructor`](../index.md#constructor-14)

#### Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="property-resource"></a> `resource` | `readonly` | `string` | API resource path (e.g., `'/vms'`). | [`WritableService`](../index.md#writableservice).[`resource`](../index.md#property-resource-3) | services/base.ts:123 |
| <a id="property-displayname"></a> `displayName` | `readonly` | `string` | Human-readable resource name for error messages (e.g., `'VM'`). | [`WritableService`](../index.md#writableservice).[`displayName`](../index.md#property-displayname-1) | services/base.ts:126 |
| <a id="property-defaultfields"></a> `defaultFields?` | `protected` | `string`[] | Per-service default fields for API requests. When set by a subclass, these fields are used instead of `'most'` for `list()` and `get()` calls where the caller does not provide explicit `fields`. This enables cross-resource joins (e.g., `machine#status#status`) so that derived fields like power state are reliably populated. User-provided `fields` always take precedence. | [`WritableService`](../index.md#writableservice).[`defaultFields`](../index.md#property-defaultfields-1) | services/base.ts:138 |
| <a id="property-actionconfig"></a> `actionConfig` | `readonly` | [`ActionConfig`](../index.md#actionconfig) | Derived or overridden action endpoint configuration. | [`WritableService`](../index.md#writableservice).[`actionConfig`](../index.md#property-actionconfig) | services/base.ts:256 |

#### Methods

##### list()

> **list**(`options?`): `Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)[]\>

Defined in: services/base.ts:157

List resources matching the given options.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListOptions`](../types.md#listoptions) | Filter, sort, fields, and pagination options |

###### Returns

`Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)[]\>

Array of matching resources

###### Inherited from

[`WritableService`](../index.md#writableservice).[`list`](../index.md#list-1)

##### get()

> **get**(`key`): `Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

Defined in: services/base.ts:174

Get a single resource by its key (ID).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID |

###### Returns

`Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

The matching resource

###### Throws

NotFoundError if the resource does not exist

###### Inherited from

[`WritableService`](../index.md#writableservice).[`get`](../index.md#get-2)

##### getByName()

> **getByName**(`name`): `Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

Defined in: services/base.ts:198

Get a single resource by its `name` field.

Performs a filtered list and returns the first match.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The resource name to search for |

###### Returns

`Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

The matching resource

###### Throws

NotFoundError if no resource with that name exists

###### Inherited from

[`WritableService`](../index.md#writableservice).[`getByName`](../index.md#getbyname-1)

##### listAll()

> **listAll**(`options?`): `AsyncGenerator`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

Defined in: services/base.ts:217

Iterate over all resources matching the given options, auto-paginating.

Fetches pages internally using `limit`/`offset` and yields individual items.
Stops when a page returns fewer items than the page size.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | [`ListAllOptions`](../types.md#listalloptions) | Filter, sort, fields, and page size options |

###### Returns

`AsyncGenerator`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

###### Yields

Individual resources across all pages

###### Inherited from

[`WritableService`](../index.md#writableservice).[`listAll`](../index.md#listall-1)

##### update()

> **update**(`key`, `params`, `options?`): `Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

Defined in: services/base.ts:293

Update an existing resource.

Sends a PUT request and optionally reads back the full resource.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The resource ID to update |
| `params` | [`TenantRecipeUpdateParams`](../types.md#tenantrecipeupdateparams) | The fields to update |
| `options?` | [`MutationOptions`](../types.md#mutationoptions) | Mutation options (e.g., `readBack: false` to skip re-fetch) |

###### Returns

`Promise`\<[`TenantRecipe`](../types.md#tenantrecipe)\>

The updated resource (or the resource with just `$key` if `readBack` is false)

###### Inherited from

[`WritableService`](../index.md#writableservice).[`update`](../index.md#update)

##### delete()

> **delete**(`key`): `Promise`\<`void`\>

Defined in: services/base.ts:309

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

Defined in: services/base.ts:330

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

Defined in: services/base.ts:356

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

Defined in: services/tenant-recipe/service.ts:58

Get the questions defined for a tenant recipe.

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

Defined in: services/tenant-recipe/service.ts:76

Get the sections defined for a tenant recipe.

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

Defined in: services/tenant-recipe/service.ts:95

Deploy a tenant recipe, creating a new recipe instance.

This creates a tenant based on the recipe template with the provided
answers to recipe questions.

Unlike VM recipes, tenant recipe deployment does not support `auto_update`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |
| `options` | [`TenantRecipeDeployOptions`](../types.md#tenantrecipedeployoptions) | Deploy options including name and answers |

###### Returns

`Promise`\<`void`\>

##### recipeAction()

> **recipeAction**(`key`, `action`, `params?`): `Promise`\<`void`\>

Defined in: services/tenant-recipe/service.ts:117

Dispatch an action on a tenant recipe.

Valid actions: `clone`, `download`, `remove`, `republish`.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |
| `action` | [`TenantRecipeAction`](../types.md#tenantrecipeaction) | The action to perform |
| `params?` | `Record`\<`string`, `unknown`\> | Optional action parameters |

###### Returns

`Promise`\<`void`\>

##### download()

> **download**(`key`): `Promise`\<`void`\>

Defined in: services/tenant-recipe/service.ts:141

Download a tenant recipe from its catalog.

Convenience method that dispatches the `download` action.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<`void`\>

##### clone()

> **clone**(`key`, `params?`): `Promise`\<`void`\>

Defined in: services/tenant-recipe/service.ts:151

Clone a tenant recipe.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |
| `params?` | `Record`\<`string`, `unknown`\> | Optional clone parameters |

###### Returns

`Promise`\<`void`\>

##### remove()

> **remove**(`key`): `Promise`\<`void`\>

Defined in: services/tenant-recipe/service.ts:160

Remove a tenant recipe.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<`void`\>

##### republish()

> **republish**(`key`): `Promise`\<`void`\>

Defined in: services/tenant-recipe/service.ts:169

Republish a tenant recipe.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | [`FlexKey`](../types.md#flexkey) | The recipe key (40-char hex string) |

###### Returns

`Promise`\<`void`\>

## References

### TenantRecipe

Re-exports [TenantRecipe](../types.md#tenantrecipe)

***

### TenantRecipeAction

Re-exports [TenantRecipeAction](../types.md#tenantrecipeaction)

***

### TenantRecipeDeployOptions

Re-exports [TenantRecipeDeployOptions](../types.md#tenantrecipedeployoptions)

***

### TenantRecipeUpdateParams

Re-exports [TenantRecipeUpdateParams](../types.md#tenantrecipeupdateparams)
