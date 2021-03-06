import axios from 'axios';

import { Address, Position, QueryObject, TimeZone } from 'typings';
import { RequestQuery as GeocodeRequestQuery } from 'pages/api/geocode';
import { RequestQuery as ReverseGeocodeRequestQuery } from 'pages/api/reverse-geocode';
import { encodeQueryObject } from 'utils/general';

interface ParsedGeocodeResponse {
  address: Address | null;
  timeZone: TimeZone | null;
}

type GeocodeClientResponse = ParsedGeocodeResponse;

function parseHereGeocodeResponse(
  response: Here.GeocodeResponse,
): ParsedGeocodeResponse {
  const { view } = response.response;
  if (view.length === 0) {
    return { address: null, timeZone: null };
  }

  const [{ result }] = view;
  const { location } = result[0];

  const { city, state, country, additionalData } = location.address;
  const { timeZone } = location.adminInfo;

  const address: Address = {
    cityName: city,
    stateCode: state,
    countryCode: country,
  };

  additionalData.forEach((item) => {
    if (item.key === 'StateName') {
      address.stateName = item.value;
    }
    if (item.key === 'CountryName') {
      address.countryName = item.value;
    }
  });

  return {
    address,
    timeZone,
  };
}

export async function reverseGeocodeClient(
  position: Position,
): Promise<GeocodeClientResponse> {
  const requestQuery: ReverseGeocodeRequestQuery = {
    position: `${position.latitude},${position.longitude}`,
  };
  const encodedQuery = encodeQueryObject(requestQuery as QueryObject);

  const { data } = await axios.get<Here.GeocodeResponse>(
    `/api/reverse-geocode?${encodedQuery}`,
  );

  const { address, timeZone } = parseHereGeocodeResponse(data);

  return {
    address,
    timeZone,
  };
}

export async function geocodeClient(
  query: GeocodeRequestQuery,
): Promise<GeocodeClientResponse> {
  const { city, state, country, locationid } = query;
  const encodedQualifiedQuery = encodeQueryObject({
    city,
    state,
    country,
    locationid,
  });

  const { data } = await axios.get<Here.GeocodeResponse>(
    `/api/geocode?${encodedQualifiedQuery}`,
  );

  const geocodeResponse = parseHereGeocodeResponse(data);

  return geocodeResponse;
}

export async function requestAddressDetails(
  query: Partial<Address>,
): Promise<Address | null> {
  const { address } = await geocodeClient({
    city: query.cityName,
    state: query.stateCode || query.stateName,
    country: query.countryCode || query.countryName,
  });

  return address;
}

export async function requestLocalTimeZone(
  query: Partial<Address>,
): Promise<TimeZone | null> {
  const { timeZone } = await geocodeClient({
    city: query.cityName,
    state: query.stateCode || query.stateName,
    country: query.countryCode || query.countryName,
  });

  return timeZone;
}

export async function requestAutocompleteSuggestions(
  queryString: string,
): Promise<Here.Suggestion[]> {
  const autocompleteResponse = await axios.get<Here.AutocompleteResponse>(
    `/api/autocomplete?query=${queryString}`,
  );

  const { suggestions } = autocompleteResponse.data;

  return suggestions;
}
