// Search bar component

export default function SearchBar() {
    return {
        render: () => {
            return `
                <input type="text" id="search-bar" class="bg-form-background text-button-text-black font-bold py-form-y px-form-x rounded-form" placeholder="Search for a movie...">
            `;
        }
    }
}