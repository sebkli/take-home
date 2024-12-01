import { create } from 'zustand';
import { Card, DeletedCard } from './components/Card';

type State = {
  cards: Card[];
  deletedCards: DeletedCard[];
  expandedCards: Card['id'][];
  showDeletedCards: boolean;
};

type Actions = {
  initializeCards: (apiCards: Card[]) => void;
  expandCard: (id: number) => void;
  deleteCard: (id: number) => void;
  revertCard: (id: number) => void;
  toggleShowDeletedCards: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  cards: [],
  deletedCards: [],
  expandedCards: [],
  showDeletedCards: false,
  initializeCards: (apiCards: Card[]) => {
    set((state) => {
      const updatedCards = apiCards
        .filter(
          (card) =>
            !state.deletedCards.some(
              (deletedCard) => deletedCard.id === card.id
            )
        )
        .map((card) => ({
          ...card,
          isExpanded: state.expandedCards.includes(card.id),
        }));

      return { cards: updatedCards };
    });
  },
  expandCard: (id: number) => {
    set((state) => {
      const isCurrentlyExpanded = state.expandedCards.includes(id);
      const updatedExpandedCards = isCurrentlyExpanded
        ? state.expandedCards.filter((cardId) => cardId !== id)
        : [...state.expandedCards, id];

      const updatedCards = state.cards.map((card) =>
        card.id === id ? { ...card, isExpanded: !isCurrentlyExpanded } : card
      );

      return {
        expandedCards: updatedExpandedCards,
        cards: updatedCards,
      };
    });
  },
  deleteCard: (id: number) => {
    set((state) => {
      const cardToDelete = state.cards.find((card) => card.id === id);
      if (!cardToDelete) return state;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { description, ...deletedCard } = cardToDelete;
      return {
        cards: state.cards.filter((card) => card.id !== id),
        deletedCards: [...state.deletedCards, deletedCard as DeletedCard],
      };
    });
  },
  toggleShowDeletedCards: () => {
    set((state) => ({
      showDeletedCards: !state.showDeletedCards, // Toggle the visibility flag
    }));
  },
  revertCard: (id: number) => {
    // In the future add code to revert a card!
    console.log(`Card reverted ${id}`);
  },
}));
