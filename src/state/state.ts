import staterino from 'staterino'
import merge from 'mergerino'
import { useReducer, useLayoutEffect } from 'preact/hooks'
import { State } from './types'

export const initialState: State = {
  // conf will always be loaded by init()
  conf: null as never,
  firstLoad: true,
  postsLoading: true,
  posts: [],
  commentsLoading: true,
  comments: [],
  noContent: false
}

export const useStore = staterino({
  state: initialState,
  merge,
  hooks: { useLayoutEffect, useReducer }
})

export const { get: getState, set: setState, subscribe } = useStore
