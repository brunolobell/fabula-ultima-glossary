import { useEffect, useId, useState } from 'react';
import {
  ORDER_OPTIONS,
  type EquipmentOrder as Order,
} from '../lib/equipmentOrder';

interface Props {
  order: Order;
  onOrder: (order: Order) => void;
  /** Maximum price in zênites, from the URL; null when off. */
  maxPrice: number | null;
  onMaxPrice: (max: number | null) => void;
}

/** "Ordenar por" and "Preço máximo" of the equipment list, for the panel of one button. */
export function EquipmentOrder({ order, onOrder, maxPrice, onMaxPrice }: Props) {
  const orderId = useId();
  const priceId = useId();
  // Typed text stays here so a half-typed value is not rewritten by the URL.
  const [text, setText] = useState(maxPrice === null ? '' : String(maxPrice));
  useEffect(() => {
    setText(maxPrice === null ? '' : String(maxPrice));
  }, [maxPrice]);

  const field =
    'min-h-[44px] rounded border border-line bg-bg px-3 text-ink';

  // Shown in the panel of the "Ordenar e preço" button (`ListFilters` `extraPanel`).
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <label htmlFor={orderId} className="flex items-center gap-2">
        <span>Ordenar por</span>
        <select
          id={orderId}
          className={field}
          value={order}
          onChange={(event) => onOrder(event.target.value as Order)}
        >
          {ORDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor={priceId} className="flex items-center gap-2">
        <span>Preço máximo</span>
        <input
          id={priceId}
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          placeholder="z"
          className={`${field} w-28`}
          value={text}
          onChange={(event) => {
            const value = event.target.value;
            setText(value);
            if (value === '') onMaxPrice(null);
            else if (/^\d+$/.test(value)) onMaxPrice(Number(value));
          }}
        />
        <span aria-hidden="true" className="text-muted">
          z
        </span>
      </label>
    </div>
  );
}
