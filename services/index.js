import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {

  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges;
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};


export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {

  const query = gql`
   query MyQuery($slug:String!, $categories:[String!]) {
     posts(
       where: {slug_not: $slug, AND: {categories_some: {slug_in:$categories}}}
       last:3
     ) {
       title
       featuredImage {
         url
       }
       createdAt
       slug
     }
   }
    
 `

  const results = await request(graphqlAPI, query, { categories, slug });

  return results.posts;
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories{
        name
        slug
      }
      

    }
  
  `
  const results = await request(graphqlAPI, query);
  return results.categories;
}

// async function to accept the comment object. This is to make an HTTP request to our api backend.
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}


export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(
        where:{post:{slug: $slug}}
      ) {
        name
        comment
        createdAt
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getFeaturedPosts = async () => {

  const query = gql`
  query MyQuery {
    posts(where: {featuredPost: true}) {
      createdAt
      slug
      title
      author {
        name
        photo {
          url
        }
      }
      featuredImage{
        url
      }
    }
  }
  
  `

  const result = await request(graphqlAPI, query)

  return result.posts;
}

export const getCategoryPosts = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};


export const getAuthors = async () => {
  const query = gql`
    query getAuthors {
      authors {
        bio
        name
        id
        photo {
          url
        }
      }
      

    }
  
  `
  const results = await request(graphqlAPI, query);
  return results.authors;
}