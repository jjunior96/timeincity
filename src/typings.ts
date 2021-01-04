import { SVGAttributes } from 'react';
import { DateTime } from 'luxon';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Address {
  city: string;
  countryCode: string;
  countryName: string;
  label: string;
  stateName: string | null;
  stateCode: string | null;
}

export interface Location {
  position: Position;
  address: Address;
  localDateTime: DateTime;
}

export type Action<T, V = void> = V extends void
  ? { type: T }
  : { type: T } & V;

export type Optional<T> = { [P in keyof T]?: T[P] };

export type PossiblyNull<T> = { [P in keyof T]: T[P] | null };

export type Merge<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

export type SVGElementProps = SVGAttributes<SVGElement>;
