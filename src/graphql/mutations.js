/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addMovie = /* GraphQL */ `
  mutation AddMovie($input: CreateMovieInput!) {
    addMovie(input: $input) {
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
export const editMovie = /* GraphQL */ `
  mutation EditMovie($input: UpdateMovieInput!) {
    editMovie(input: $input) {
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
export const removeMovie = /* GraphQL */ `
  mutation RemoveMovie($input: DeleteMovieInput!) {
    removeMovie(input: $input) {
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
export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
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
