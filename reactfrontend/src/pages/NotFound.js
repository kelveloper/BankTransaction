function NotFound() {
    return (
      <div className="NotFound">
        <div class="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div class="bg-white border border-gray-200 flex flex-col items-center justify-center py-12 px-4 rounded-lg shadow-2xl">
                <p class="text-6xl font-bold  text-gray-300">ERROR 404</p>
                <p class="text-2xl font-bold text-gray-500 mt-4">Page Not Found</p>
            </div>
        </div>
      </div>
    );
  }
  
  export default NotFound;