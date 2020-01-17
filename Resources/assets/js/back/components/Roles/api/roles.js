import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer cd4ad4d362dadc8a90a36f0050c003c252e71eec',
      },
    });
  },
});

const GET_ORGANIZATION = gql`
  query($organization: String!) {
    organization(login: $organization) {
      name
      url
    }
  }
`;

export function getData() {


  console.log("get data!");

  return client
    .query({
      query: GET_ORGANIZATION,
      variables: {
        organization: 'the-road-to-learn-react',
      },
    });

  /*
  return (dispatch) => {

    axios.post('/architect/contents', data)
       .then((response) => {
           if(response.data.success) {

               dispatch(onSaveSuccess(response.data));
               setTimeout(function(){
                   window.location.href = routes.showContent.replace(':id',response.data.content.id);
               },1500);
           }
       })
       .catch((error) => {

           dispatch(saving(false));

           if (error.response) {
               dispatch(onSaveError(error.response.data));
           } else if (error.message) {
               toastr.error(error.message);
           } else {
               //console.log('Error', error.message);
           }
       });
    }
    */
}
