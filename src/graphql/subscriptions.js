/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie(
    $filter: ModelSubscriptionMovieFilterInput
    $owner: String
  ) {
    onCreateMovie(filter: $filter, owner: $owner) {
      id
      title
      original_title
      japanese_title
      overview
      japanese_overview
      poster_path
      release_date
      popularity
      vote_average
      vote_count
      belongs_to_collection {
        id
        name
        poster_path
        backdrop_path
        __typename
      }
      cast {
        id
        name
        character
        profile_path
        __typename
      }
      crew {
        id
        name
        job
        profile_path
        __typename
      }
      translations {
        iso_3166_1
        iso_639_1
        name
        english_name
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie(
    $filter: ModelSubscriptionMovieFilterInput
    $owner: String
  ) {
    onUpdateMovie(filter: $filter, owner: $owner) {
      id
      title
      original_title
      japanese_title
      overview
      japanese_overview
      poster_path
      release_date
      popularity
      vote_average
      vote_count
      belongs_to_collection {
        id
        name
        poster_path
        backdrop_path
        __typename
      }
      cast {
        id
        name
        character
        profile_path
        __typename
      }
      crew {
        id
        name
        job
        profile_path
        __typename
      }
      translations {
        iso_3166_1
        iso_639_1
        name
        english_name
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie(
    $filter: ModelSubscriptionMovieFilterInput
    $owner: String
  ) {
    onDeleteMovie(filter: $filter, owner: $owner) {
      id
      title
      original_title
      japanese_title
      overview
      japanese_overview
      poster_path
      release_date
      popularity
      vote_average
      vote_count
      belongs_to_collection {
        id
        name
        poster_path
        backdrop_path
        __typename
      }
      cast {
        id
        name
        character
        profile_path
        __typename
      }
      crew {
        id
        name
        job
        profile_path
        __typename
      }
      translations {
        iso_3166_1
        iso_639_1
        name
        english_name
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
