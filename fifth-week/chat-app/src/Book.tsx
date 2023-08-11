import { useSubscription, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const BOOK_COUNT_SUBSCRIPTION = gql`
  subscription {
    stockUpdate {
      id
      count
    }
  }
`;

const INCREMENT_STOCK_MUTATION = gql`
  mutation IncrementStock {
    incrementStock {
      id
      count
    }
  }
`;

const DECREMENT_STOCK_MUTATION = gql`
  mutation DecrementStock {
    decrementStock {
      id
      count
    }
  }
`;

const Book = () => {
  const { data, loading, error } = useSubscription(BOOK_COUNT_SUBSCRIPTION);

  const [incrementStock] = useMutation(INCREMENT_STOCK_MUTATION);
  const [decrementStock] = useMutation(DECREMENT_STOCK_MUTATION);

  if (loading) return <p className="text-gray-700">Loading book app...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const book = data.stockUpdate;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">Book Count: {book.count}</h2>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => incrementStock()}
        >
          Increment
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => decrementStock()}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Book;
