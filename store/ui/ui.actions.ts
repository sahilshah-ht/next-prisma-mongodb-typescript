import { UiState } from '.'

export const uiActions = {
  toggleSidebar: (state: UiState) => {
    return {
      ...state,
      sidebar: {
        isOpen: !state.sidebar.isOpen,
      },
    }
  },
}
