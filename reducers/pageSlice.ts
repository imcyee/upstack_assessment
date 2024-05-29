import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PageState {
  value: number
  maxPage: number
}

const initialState: PageState = {
  value: 1,
  maxPage: -1
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    setMaxPage: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setMaxPage } = pageSlice.actions

export default pageSlice.reducer