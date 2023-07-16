import { GraphQLResolveInfo } from 'graphql';
import { ApplicationContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Box = {
  __typename?: 'Box';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  name: Scalars['String']['output'];
};

export type Item = {
  __typename?: 'Item';
  box?: Maybe<Box>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type Jwt = {
  __typename?: 'JWT';
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBox?: Maybe<Box>;
  createItem?: Maybe<Item>;
  deleteBox?: Maybe<Scalars['Boolean']['output']>;
  deleteItem?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Jwt>;
  register?: Maybe<Jwt>;
  updateBox?: Maybe<Box>;
  updateItem?: Maybe<Item>;
};


export type MutationCreateBoxArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateItemArgs = {
  item: NewItem;
};


export type MutationDeleteBoxArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  user: UserRegister;
};


export type MutationUpdateBoxArgs = {
  box: UpdateBox;
};


export type MutationUpdateItemArgs = {
  item: UpdateItem;
};

export type NewItem = {
  boxId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  boxes?: Maybe<Array<Maybe<Box>>>;
  items?: Maybe<Array<Maybe<Item>>>;
  me?: Maybe<User>;
};


export type QueryBoxesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateBox = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItem = {
  boxId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  boxes?: Maybe<Array<Maybe<Box>>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<Maybe<Item>>>;
  name?: Maybe<Scalars['String']['output']>;
};


export type UserBoxesArgs = {
  boxId?: InputMaybe<Scalars['ID']['input']>;
};


export type UserItemsArgs = {
  itemId?: InputMaybe<Scalars['ID']['input']>;
};

export type UserRegister = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Box: ResolverTypeWrapper<Box>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Item: ResolverTypeWrapper<Item>;
  JWT: ResolverTypeWrapper<Jwt>;
  Mutation: ResolverTypeWrapper<{}>;
  NewItem: NewItem;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateBox: UpdateBox;
  UpdateItem: UpdateItem;
  User: ResolverTypeWrapper<User>;
  UserRegister: UserRegister;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Box: Box;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Item: Item;
  JWT: Jwt;
  Mutation: {};
  NewItem: NewItem;
  Query: {};
  String: Scalars['String']['output'];
  UpdateBox: UpdateBox;
  UpdateItem: UpdateItem;
  User: User;
  UserRegister: UserRegister;
};

export type BoxResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Box'] = ResolversParentTypes['Box']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  box?: Resolver<Maybe<ResolversTypes['Box']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JwtResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['JWT'] = ResolversParentTypes['JWT']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBox?: Resolver<Maybe<ResolversTypes['Box']>, ParentType, ContextType, RequireFields<MutationCreateBoxArgs, 'name'>>;
  createItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'item'>>;
  deleteBox?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteBoxArgs, 'id'>>;
  deleteItem?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'user'>>;
  updateBox?: Resolver<Maybe<ResolversTypes['Box']>, ParentType, ContextType, RequireFields<MutationUpdateBoxArgs, 'box'>>;
  updateItem?: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'item'>>;
};

export type QueryResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  boxes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Box']>>>, ParentType, ContextType, Partial<QueryBoxesArgs>>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType, Partial<QueryItemsArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApplicationContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  boxes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Box']>>>, ParentType, ContextType, Partial<UserBoxesArgs>>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['Item']>>>, ParentType, ContextType, Partial<UserItemsArgs>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApplicationContext> = {
  Box?: BoxResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  JWT?: JwtResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

