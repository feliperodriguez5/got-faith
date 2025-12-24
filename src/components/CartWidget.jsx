function CartWidget({ text }) {
    return (
        <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            {text}
        </button>
    );
}


export default CartWidget;