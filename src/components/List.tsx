import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';

import { Card, DeletedCard } from './Card';

type ListProps = {
  cards: Card[] | DeletedCard[];
};

export const List: FC<ListProps> = ({ cards }) => {
  const [cardRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="flex flex-col gap-y-3" ref={cardRef}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      {cards.length === 0 && (
        <h2 className="mb-1 font-medium text-lg">This list is empty</h2>
      )}
    </div>
  );
};
