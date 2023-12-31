import { FiTrash2 } from 'react-icons/fi';
import scss from './RecipesItem.module.scss';
import placeholder from '../../images/thumb-placeholder-large.png';
import { Link } from 'react-router-dom';

const RecipesItem = ({ id, description, drink, drinkThumb, removeResipes }) => {
  return (
    <>
      <li className={scss.recipesItem}>
        <div className={scss.wraperCard}>
          <img
            className={scss.recipesItemImg}
            src={drinkThumb || placeholder}
            alt={drink}
          />
          <h3 className={scss.recipesItemTitle}>{drink}</h3>
          <h4 className={scss.recipesItemSubTitle}>Іngredients</h4>
          <p className={scss.recipesItemText}>
            {description || 'No description'}
          </p>

          <div className={scss.wraperBottom}>
            <Link className={scss.recipesItemLink} to={`/recipe/${id}`}>
              See recipe
            </Link>
            <button
              className={scss.recipesItemButton}
              type="button"
              onClick={() => removeResipes(id)}
            >
              <FiTrash2 className={scss.recipesItemIcon} size={24} />
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default RecipesItem;
