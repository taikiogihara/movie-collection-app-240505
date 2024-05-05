/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovieById = /* GraphQL */ `
  query GetMovieById($id: ID!) {
    getMovieById(id: $id) {
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
export const getMovieList = /* GraphQL */ `
  query GetMovieList {
    getMovieList {
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
export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
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
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
