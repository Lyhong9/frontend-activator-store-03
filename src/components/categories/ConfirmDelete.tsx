
import type { ICategory } from '../../types/category';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  category?: ICategory;
  confirmDeleteCategory: (id: number) => void;
}

const ConfirmDelete = ({ isOpen, setIsOpen, category, confirmDeleteCategory }: Props) => {
  return (
    
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete {category?.name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (category?.id) {
                  confirmDeleteCategory(category.id);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default ConfirmDelete