/* eslint-disable */
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String'];
  conversationId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['String']>;
};

export type ChatMessageWhereInput = {
  conversationId?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  isSummary?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<MessageSource>;
};

export type ChatMessageWithCount = {
  __typename?: 'ChatMessageWithCount';
  count: Scalars['Float'];
  items: Array<ChatMessage>;
};

export type ChatMessagesInput = {
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
  where?: InputMaybe<ChatMessageWhereInput>;
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  owner: ConversationOwner;
  prompt: Scalars['String'];
};

export enum ConversationOwner {
  Epona = 'EPONA'
}

export type ConversationWhere = {
  owner?: InputMaybe<ConversationOwner>;
};

export type ConversationWithCount = {
  __typename?: 'ConversationWithCount';
  conversation: Conversation;
  count: Scalars['Float'];
};

export type ConversationsInput = {
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
  where?: InputMaybe<ConversationWhere>;
  withDeleted?: InputMaybe<Scalars['Boolean']>;
};

export type CreateChatMessageInput = {
  content: Scalars['String'];
  conversationId: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isSummary?: InputMaybe<Scalars['Boolean']>;
  role: MessageSource;
};

export type CreateConversationInput = {
  name: Scalars['String'];
  owner: ConversationOwner;
  prompt: Scalars['String'];
};

export type LoadEponaMemoryInput = {
  conversationId: Scalars['String'];
};

export enum MessageSource {
  Assistant = 'ASSISTANT',
  System = 'SYSTEM',
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  createChatMessage: ChatMessage;
  createConversation: Conversation;
  deleteChatMessages: SuccessResponse;
  deleteConversations: SuccessResponse;
  loadEponaMemory: SuccessResponse;
  saveEponaMemory: SuccessResponse;
  updateChatMessage: ChatMessage;
  updateConversation: Conversation;
};


export type MutationCreateChatMessageArgs = {
  input: CreateChatMessageInput;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationDeleteChatMessagesArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationDeleteConversationsArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationLoadEponaMemoryArgs = {
  input: LoadEponaMemoryInput;
};


export type MutationSaveEponaMemoryArgs = {
  input: SaveEponaMemoryInput;
};


export type MutationUpdateChatMessageArgs = {
  input: UpdateChatMessageInput;
};


export type MutationUpdateConversationArgs = {
  input: UpdateConversationInput;
};

export type Query = {
  __typename?: 'Query';
  chatMessages: Array<ChatMessage>;
  chatMessagesWithCount: Array<ChatMessageWithCount>;
  conversationById: Conversation;
  conversations: Array<Conversation>;
  conversationsWithCount: Array<ConversationWithCount>;
};


export type QueryChatMessagesArgs = {
  input?: InputMaybe<ChatMessagesInput>;
};


export type QueryChatMessagesWithCountArgs = {
  input?: InputMaybe<ChatMessagesInput>;
};


export type QueryConversationByIdArgs = {
  id: Scalars['String'];
};


export type QueryConversationsArgs = {
  input?: InputMaybe<ConversationsInput>;
};


export type QueryConversationsWithCountArgs = {
  input?: InputMaybe<ConversationsInput>;
};

export type SaveEponaMemoryInput = {
  conversationId: Scalars['String'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type UpdateChatMessageInput = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  images?: InputMaybe<Array<Scalars['String']>>;
  isSummary?: InputMaybe<Scalars['Boolean']>;
  role?: InputMaybe<MessageSource>;
};

export type UpdateConversationInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<ConversationOwner>;
  prompt?: InputMaybe<Scalars['String']>;
};

export type ChatMessageFragment = { __typename?: 'ChatMessage', content: string, conversationId?: string | null, createdAt: string, id: string, updatedAt: string, userId?: string | null };

export type ConversationFragment = { __typename?: 'Conversation', createdAt: string, id: string, name: string, owner: ConversationOwner, prompt: string };

export type SuccessResponseFragment = { __typename?: 'SuccessResponse', message?: string | null, success: boolean };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', createdAt: string, id: string, name: string, owner: ConversationOwner, prompt: string } };

export type LoadEponaMemoryMutationVariables = Exact<{
  input: LoadEponaMemoryInput;
}>;


export type LoadEponaMemoryMutation = { __typename?: 'Mutation', loadEponaMemory: { __typename?: 'SuccessResponse', message?: string | null, success: boolean } };

export type SaveEponaMemoryMutationVariables = Exact<{
  input: SaveEponaMemoryInput;
}>;


export type SaveEponaMemoryMutation = { __typename?: 'Mutation', saveEponaMemory: { __typename?: 'SuccessResponse', message?: string | null, success: boolean } };

export type ConversationByIdQueryVariables = Exact<{
  conversationByIdId: Scalars['String'];
}>;


export type ConversationByIdQuery = { __typename?: 'Query', conversationById: { __typename?: 'Conversation', createdAt: string, id: string, name: string, owner: ConversationOwner, prompt: string } };

export type ConversationsQueryVariables = Exact<{
  input: ConversationsInput;
}>;


export type ConversationsQuery = { __typename?: 'Query', conversations: Array<{ __typename?: 'Conversation', createdAt: string, id: string, name: string, owner: ConversationOwner, prompt: string }> };

export type ChatMessageKeySpecifier = ('content' | 'conversationId' | 'createdAt' | 'id' | 'updatedAt' | 'userId' | ChatMessageKeySpecifier)[];
export type ChatMessageFieldPolicy = {
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	conversationId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChatMessageWithCountKeySpecifier = ('count' | 'items' | ChatMessageWithCountKeySpecifier)[];
export type ChatMessageWithCountFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationKeySpecifier = ('createdAt' | 'id' | 'name' | 'owner' | 'prompt' | ConversationKeySpecifier)[];
export type ConversationFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	prompt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationWithCountKeySpecifier = ('conversation' | 'count' | ConversationWithCountKeySpecifier)[];
export type ConversationWithCountFieldPolicy = {
	conversation?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createChatMessage' | 'createConversation' | 'deleteChatMessages' | 'deleteConversations' | 'loadEponaMemory' | 'saveEponaMemory' | 'updateChatMessage' | 'updateConversation' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createChatMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	createConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteChatMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	loadEponaMemory?: FieldPolicy<any> | FieldReadFunction<any>,
	saveEponaMemory?: FieldPolicy<any> | FieldReadFunction<any>,
	updateChatMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	updateConversation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('chatMessages' | 'chatMessagesWithCount' | 'conversationById' | 'conversations' | 'conversationsWithCount' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	chatMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	chatMessagesWithCount?: FieldPolicy<any> | FieldReadFunction<any>,
	conversationById?: FieldPolicy<any> | FieldReadFunction<any>,
	conversations?: FieldPolicy<any> | FieldReadFunction<any>,
	conversationsWithCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SuccessResponseKeySpecifier = ('message' | 'success' | SuccessResponseKeySpecifier)[];
export type SuccessResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ChatMessage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChatMessageKeySpecifier | (() => undefined | ChatMessageKeySpecifier),
		fields?: ChatMessageFieldPolicy,
	},
	ChatMessageWithCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChatMessageWithCountKeySpecifier | (() => undefined | ChatMessageWithCountKeySpecifier),
		fields?: ChatMessageWithCountFieldPolicy,
	},
	Conversation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationKeySpecifier | (() => undefined | ConversationKeySpecifier),
		fields?: ConversationFieldPolicy,
	},
	ConversationWithCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationWithCountKeySpecifier | (() => undefined | ConversationWithCountKeySpecifier),
		fields?: ConversationWithCountFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	SuccessResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SuccessResponseKeySpecifier | (() => undefined | SuccessResponseKeySpecifier),
		fields?: SuccessResponseFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
export const ChatMessageFragmentDoc = /*#__PURE__*/ gql`
    fragment ChatMessage on ChatMessage {
  content
  conversationId
  createdAt
  id
  updatedAt
  userId
}
    `;
export const ConversationFragmentDoc = /*#__PURE__*/ gql`
    fragment Conversation on Conversation {
  createdAt
  id
  name
  owner
  prompt
}
    `;
export const SuccessResponseFragmentDoc = /*#__PURE__*/ gql`
    fragment SuccessResponse on SuccessResponse {
  message
  success
}
    `;
export const CreateConversationDocument = /*#__PURE__*/ gql`
    mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    ...Conversation
  }
}
    ${ConversationFragmentDoc}`;
export type CreateConversationMutationFn = Apollo.MutationFunction<CreateConversationMutation, CreateConversationMutationVariables>;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createConversationMutation, { data, loading, error }] = useCreateConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<CreateConversationMutation, CreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
      }
export type CreateConversationMutationHookResult = ReturnType<typeof useCreateConversationMutation>;
export type CreateConversationMutationResult = Apollo.MutationResult<CreateConversationMutation>;
export type CreateConversationMutationOptions = Apollo.BaseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>;
export const LoadEponaMemoryDocument = /*#__PURE__*/ gql`
    mutation LoadEponaMemory($input: LoadEponaMemoryInput!) {
  loadEponaMemory(input: $input) {
    ...SuccessResponse
  }
}
    ${SuccessResponseFragmentDoc}`;
export type LoadEponaMemoryMutationFn = Apollo.MutationFunction<LoadEponaMemoryMutation, LoadEponaMemoryMutationVariables>;

/**
 * __useLoadEponaMemoryMutation__
 *
 * To run a mutation, you first call `useLoadEponaMemoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoadEponaMemoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loadEponaMemoryMutation, { data, loading, error }] = useLoadEponaMemoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoadEponaMemoryMutation(baseOptions?: Apollo.MutationHookOptions<LoadEponaMemoryMutation, LoadEponaMemoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoadEponaMemoryMutation, LoadEponaMemoryMutationVariables>(LoadEponaMemoryDocument, options);
      }
export type LoadEponaMemoryMutationHookResult = ReturnType<typeof useLoadEponaMemoryMutation>;
export type LoadEponaMemoryMutationResult = Apollo.MutationResult<LoadEponaMemoryMutation>;
export type LoadEponaMemoryMutationOptions = Apollo.BaseMutationOptions<LoadEponaMemoryMutation, LoadEponaMemoryMutationVariables>;
export const SaveEponaMemoryDocument = /*#__PURE__*/ gql`
    mutation SaveEponaMemory($input: SaveEponaMemoryInput!) {
  saveEponaMemory(input: $input) {
    ...SuccessResponse
  }
}
    ${SuccessResponseFragmentDoc}`;
export type SaveEponaMemoryMutationFn = Apollo.MutationFunction<SaveEponaMemoryMutation, SaveEponaMemoryMutationVariables>;

/**
 * __useSaveEponaMemoryMutation__
 *
 * To run a mutation, you first call `useSaveEponaMemoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEponaMemoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEponaMemoryMutation, { data, loading, error }] = useSaveEponaMemoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveEponaMemoryMutation(baseOptions?: Apollo.MutationHookOptions<SaveEponaMemoryMutation, SaveEponaMemoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveEponaMemoryMutation, SaveEponaMemoryMutationVariables>(SaveEponaMemoryDocument, options);
      }
export type SaveEponaMemoryMutationHookResult = ReturnType<typeof useSaveEponaMemoryMutation>;
export type SaveEponaMemoryMutationResult = Apollo.MutationResult<SaveEponaMemoryMutation>;
export type SaveEponaMemoryMutationOptions = Apollo.BaseMutationOptions<SaveEponaMemoryMutation, SaveEponaMemoryMutationVariables>;
export const ConversationByIdDocument = /*#__PURE__*/ gql`
    query ConversationById($conversationByIdId: String!) {
  conversationById(id: $conversationByIdId) {
    ...Conversation
  }
}
    ${ConversationFragmentDoc}`;

/**
 * __useConversationByIdQuery__
 *
 * To run a query within a React component, call `useConversationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationByIdQuery({
 *   variables: {
 *      conversationByIdId: // value for 'conversationByIdId'
 *   },
 * });
 */
export function useConversationByIdQuery(baseOptions: Apollo.QueryHookOptions<ConversationByIdQuery, ConversationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationByIdQuery, ConversationByIdQueryVariables>(ConversationByIdDocument, options);
      }
export function useConversationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationByIdQuery, ConversationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationByIdQuery, ConversationByIdQueryVariables>(ConversationByIdDocument, options);
        }
export type ConversationByIdQueryHookResult = ReturnType<typeof useConversationByIdQuery>;
export type ConversationByIdLazyQueryHookResult = ReturnType<typeof useConversationByIdLazyQuery>;
export type ConversationByIdQueryResult = Apollo.QueryResult<ConversationByIdQuery, ConversationByIdQueryVariables>;
export function refetchConversationByIdQuery(variables: ConversationByIdQueryVariables) {
      return { query: ConversationByIdDocument, variables: variables }
    }
export const ConversationsDocument = /*#__PURE__*/ gql`
    query Conversations($input: ConversationsInput!) {
  conversations(input: $input) {
    ...Conversation
  }
}
    ${ConversationFragmentDoc}`;

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConversationsQuery(baseOptions: Apollo.QueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
      }
export function useConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversationsQuery, ConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, options);
        }
export type ConversationsQueryHookResult = ReturnType<typeof useConversationsQuery>;
export type ConversationsLazyQueryHookResult = ReturnType<typeof useConversationsLazyQuery>;
export type ConversationsQueryResult = Apollo.QueryResult<ConversationsQuery, ConversationsQueryVariables>;
export function refetchConversationsQuery(variables: ConversationsQueryVariables) {
      return { query: ConversationsDocument, variables: variables }
    }
export const namedOperations = {
  Query: {
    ConversationById: 'ConversationById',
    Conversations: 'Conversations'
  },
  Mutation: {
    CreateConversation: 'CreateConversation',
    LoadEponaMemory: 'LoadEponaMemory',
    SaveEponaMemory: 'SaveEponaMemory'
  },
  Fragment: {
    ChatMessage: 'ChatMessage',
    Conversation: 'Conversation',
    SuccessResponse: 'SuccessResponse'
  }
}