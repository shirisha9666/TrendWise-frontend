import React from "react";

const Footer=() =>{
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} TrendWise. All rights reserved.</div>
        <div className="flex gap-3 text-sm">
          <a className="text-gray-600 hover:text-blue-600" href="/#">Privacy</a>
          <a className="text-gray-600 hover:text-blue-600" href="/#">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer