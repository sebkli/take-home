import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../store';

import { useGetListData } from '../api/getListData';
import { Button, ToggleButton } from './Buttons';
import { List } from './List';
import { Spinner } from './Spinner';

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const {
    cards,
    deletedCards,
    initializeCards,
    showDeletedCards,
    toggleShowDeletedCards,
  } = useStore(
    useShallow((state) => ({
      cards: state.cards,
      deletedCards: state.deletedCards,
      initializeCards: state.initializeCards,
      showDeletedCards: state.showDeletedCards,
      toggleShowDeletedCards: state.toggleShowDeletedCards,
    }))
  );

  const [listRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    if (!listQuery.isLoading) {
      const data = listQuery.data?.filter((item) => item.isVisible) ?? [];
      initializeCards(data);
    }
  }, [listQuery.data, listQuery.isLoading, initializeCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  if (listQuery.isError) {
    return (
      <div className="flex flex-col gap-1">
        <h1 className="font-medium text-lg">Something went wrong</h1>
        <Button className="self-center">Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex gap-x-16 w-full max-w-5xl">
      <div className="w-full max-w-xl" ref={listRef}>
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({cards.length})
          </h1>
          <ToggleButton onText="On" offText="Off" />
        </div>
        <List cards={cards} />
      </div>
      <div className="w-full max-w-xl" ref={listRef}>
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards {deletedCards.length}
          </h1>
          <Button
            onClick={() => {
              listQuery.refetch();
            }}
            disabled={listQuery.isFetching}
          >
            {listQuery.isFetching ? 'Loading' : 'Refetch'}
          </Button>
          <Button
            disabled={deletedCards.length === 0}
            onClick={() => {
              toggleShowDeletedCards();
            }}
          >
            Reveal
          </Button>
        </div>
        {showDeletedCards && <List cards={deletedCards} />}
      </div>
    </div>
  );
};
