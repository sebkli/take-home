import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ListItem } from '../api/getListData';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  RevertIcon,
  XMarkIcon,
} from '../assets/icons';
import { useStore } from '../store';
import { IconButton } from './Buttons';

export type Card = ListItem & { isExpanded?: boolean };
export type DeletedCard = Omit<Card, 'description'>;

type CardProps = {
  card: Card | DeletedCard;
};

export const Card: FC<CardProps> = ({ card }) => {
  const { expandCard, deleteCard, revertCard } = useStore(
    useShallow((state) => ({
      expandCard: state.expandCard,
      deleteCard: state.deleteCard,
      revertCard: state.revertCard,
    }))
  );

  const [cardRef] = useAutoAnimate<HTMLParagraphElement>();

  const cardActions = () => {
    if ('description' in card) {
      return (
        <>
          <IconButton
            onClick={() => {
              expandCard(card.id);
            }}
          >
            {card.isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
          <IconButton onClick={() => deleteCard(card.id)}>
            <XMarkIcon />
          </IconButton>
        </>
      );
    } else {
      return (
        <IconButton onClick={() => revertCard(card.id)}>
          <RevertIcon />
        </IconButton>
      );
    }
  };

  return (
    <div className="border border-black px-2 py-1.5" ref={cardRef}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{card.title}</h1>
        <div className="flex">{cardActions()}</div>
      </div>
      {'description' in card && card.isExpanded && (
        <p className="text-sm ">{card.description}</p>
      )}
    </div>
  );
};
