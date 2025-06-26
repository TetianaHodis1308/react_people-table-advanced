import { Link } from 'react-router-dom';
import { Gender } from '../types/Gender';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { memo } from 'react';

type PeopleFiltersPrors = {
  query: string;
  selectedGender: string;
  selectedCentury: string[];
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const centuryFilterValues = ['16', '17', '18', '19', '20'];

export const PeopleFilters = memo(
  ({
    query,
    handleQueryChange,
    selectedGender,
    selectedCentury,
  }: PeopleFiltersPrors) => {
    const isAllCenturiesSelected = selectedCentury.length === 0;

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          {Object.entries(Gender).map(([key, value]) => {
            const isActive =
              (value === Gender.All && !selectedGender) ||
              value === selectedGender;

            return (
              <SearchLink
                key={key}
                params={{ sex: value === '' ? null : value }}
                className={isActive ? 'is-active' : ''}
              >
                {key}
              </SearchLink>
            );
          })}
        </p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={handleQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuryFilterValues.map(century => {
                const isActive = selectedCentury.includes(century);
                const newSelectedCentury = isActive
                  ? selectedCentury.filter(c => c !== century)
                  : [...selectedCentury, century];

                const params = {
                  centuries:
                    newSelectedCentury.length > 0 ? newSelectedCentury : null,
                };

                return (
                  <SearchLink
                    key={century}
                    params={params}
                    data-cy="century"
                    className={cn('button mr-1', { 'is-info': isActive })}
                  >
                    {century}
                  </SearchLink>
                );
              })}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{ centuries: null }}
                data-cy="centuryALL"
                className={cn({
                  'button is-success': isAllCenturiesSelected,
                  'button is-outlined': !isAllCenturiesSelected,
                })}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <Link
            className="button is-link is-outlined is-fullwidth"
            to="/people"
          >
            Reset all filters
          </Link>
        </div>
      </nav>
    );
  },
);

PeopleFilters.displayName = 'PeopleFilters';
