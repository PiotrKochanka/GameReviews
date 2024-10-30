<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File; // Upewnij się, że używasz tego importu
use App\Models\Catalog;

class CatalogController extends Controller
{
    // Tworzenie nowego folderu
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string'
        ]);

        // Ścieżka do folderu, który będzie tworzony
        $folderPath = 'public/catalogs/' . $request->name;

        // Sprawdzanie, czy folder już istnieje
        if (Storage::exists($folderPath)) {
            return response()->json(['error' => 'Folder already exists'], 400);
        }

        // Tworzenie nowego folderu
        Storage::makeDirectory($folderPath);

        // Zapisywanie folderu w tabeli catalog
        $catalog = new Catalog();
        $catalog->name = $request->name;
        $catalog->save();
        
        return response()->json(['success' => 'Folder created successfully']);
    }

    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'catalog_id' => 'required|exists:catalogs,id', // Upewnij się, że ID katalogu istnieje w bazie
        ]);

        // Pobieranie ID katalogu
        $catalog = Catalog::find($request->catalog_id);
        $folderPath = 'public/catalogs/' . $catalog->name; // używamy nazwy katalogu

        // Sprawdzanie, czy folder istnieje
        if (!Storage::exists($folderPath)) {
            return response()->json(['error' => 'Folder does not exist'], 400);
        }

        // Pobieranie oryginalnej nazwy pliku
        $fileName = $request->file->getClientOriginalName();

        // Zapisywanie pliku w wybranym folderze
        Storage::putFileAs($folderPath, $request->file, $fileName);

        // Zapisz informacje w tabeli files
        $file = new \App\Models\File(); // lub użyj use App\Models\File; na górze
        $file->name = $fileName;
        $file->path = $folderPath . '/' . $fileName;
        $file->catalog_id = $catalog->id; // Upewnij się, że masz to w request
        $file->save();

        return response()->json(['success' => 'File uploaded successfully']);
    }

    public function getFolders()
    {
        $folders = Catalog::all(['id', 'name']); // Pobierz ID i nazwę folderów
        return response()->json(['folders' => $folders]);
    }

    // Pobieranie plików z danego folderu
public function getFiles(Request $request)
{
    $request->validate([
        'catalog_id' => 'required|exists:catalogs,id'
    ]);
    
    $catalog = Catalog::find($request->catalog_id);
    $folderPath = 'public/catalogs/' . $catalog->name;

    // Sprawdzanie, czy folder istnieje
    if (!Storage::exists($folderPath)) {
        return response()->json(['error' => 'Folder does not exist'], 400);
    }

    // Pobieranie listy plików z katalogu
    $files = Storage::files($folderPath);

    // Tworzenie tablicy plików z ich ścieżkami bez prefiksu public
    $fileList = array_map(function ($file) {
        return [
            'name' => basename($file),
            'path' => str_replace('public/', '', $file), // Usunięcie prefiksu public
        ];
    }, $files);

    return response()->json(['files' => $fileList]); // Użyj 'files' jako klucza
}

    
    public function getImages() {
        // Załóżmy, że masz model File do reprezentacji plików
        $images = File::all(); // Pobierz wszystkie pliki
        return response()->json($images);
    }

    // Usuwanie pliku z katalogu
    public function deleteFile(Request $request)
    {
        $request->validate([
            'file' => 'required|string',
            'folder' => 'required|string'
        ]);

        $filePath = 'public/catalogs/' . $request->folder . '/' . $request->file;

        // Sprawdzanie, czy plik istnieje
        if (!Storage::exists($filePath)) {
            return response()->json(['error' => 'File does not exist'], 400);
        }

        // Usuwanie pliku
        Storage::delete($filePath);

        return response()->json(['success' => 'File deleted successfully']);
    }
}
