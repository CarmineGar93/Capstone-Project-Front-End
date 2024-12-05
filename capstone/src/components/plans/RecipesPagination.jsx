function RecipesPagination({ recipePerPage, totalRecipes, setCurrentPage, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRecipes / recipePerPage); i++) {
        pageNumbers.push(i)
    }
    const paginate = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${currentPage === number ? "active" : ""}`}
                    >
                        <a
                            onClick={(e) => paginate(number, e)}
                            href="!#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default RecipesPagination