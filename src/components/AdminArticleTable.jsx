import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon } from "@/components/icons/EditIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { ImSpinner2 } from "react-icons/im";
import Pagination from "@/components/Pagination";

    function AdminArticleTable({ data, isLoading, handleEdit, handleDeleteClick ,setPage}) {
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ImSpinner2 className="animate-spin text-2xl" />
        </div>
      ) : (
        <>
          <div className="p-4 md:p-10">
            <Table>
              {/* Table header with column titles */}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Article title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              {/* Table body with article data */}
              {Array.isArray(data?.posts) && data?.posts.length > 0 ? (
                <TableBody>
                  {Array.isArray(data?.posts) &&
                    data.posts.map((post, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>
                          <span className="inline-flex capitalize items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {post.status}
                          </span>
                        </TableCell>

                        {/* Action buttons column */}
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleEdit(post.id);
                            }}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(post.id)}
                          >
                            <TrashIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No articles found
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
        </>
      )}
            <div className="w-full sm:fixed bottom-0 left-0 right-0">
        <div className="w-full flex justify-center sm:justify-end items-center px-15 mb-5">
          <Pagination totalPages={10} page={9} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default AdminArticleTable;
