import ItemNotCocktails from 'components/FavoritePage/ItemNotCocktails';
import Paginator from 'components/FavoritePage/Paginator';
import RecipesList from 'components/FavoritePage/RecipesList';
import LoadingSpinner from 'components/Shared/LoadingSpinner';
import Container from 'components/Shared/Container';
import AuthNavTitle from 'components/WelcomePage/AuthNavTitle';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
} from 'redux/recipesSlice';
import scss from './FavoritePage.module.scss';

const FavoritePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowDimensions();
  const limit = width >= 1440 ? 9 : 8;
  const { data, isLoading, isError } = useGetFavoritesQuery(
    `?page=${searchParams.get('page')}&limit=${limit}`
  );
  const [toggleFavorite] = useToggleFavoriteMutation();
  const pagesQty = Math.ceil(data?.totalHits / limit);
  const title = 'Favorites';

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: 1 });
      return;
    }
  }, [searchParams, setSearchParams]);

  if (isLoading) return <LoadingSpinner />;

  const removeFavorite = id => {
    toggleFavorite(id)
      .unwrap()
      .then(() => {
        if (pagesQty === 1) return;

        if (data.favorites.length === 1) {
          setSearchParams({ page: pagesQty - 1 });
        }
      });
  };

  return <section className={scss.wraper} >
    <Container>
    <AuthNavTitle title={title} />
      {data?.totalHits && !isError ? (
        <>
          <RecipesList data={data} removeFavorite={removeFavorite} />
          <Paginator pagesQty={pagesQty} />
        </>
      ) : (
        <ItemNotCocktails />
      )}
    </Container>
  </section>
};

export default FavoritePage;

