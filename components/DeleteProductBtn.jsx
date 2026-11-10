"use client"
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { deleteProduct } from '@/lib/actions'

const DeleteProductBtn = ({ id, redirectTo, className, children }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm("Are you sure want to delete the product ?")) {
            toast.info("Deleting Canceled.")
            return // > it means return  the info alert then stop here.
        }

        startTransition(async () => {
            const result = await deleteProduct(id)
            if (result.success) {
                toast.success(result.message)
                if (redirectTo) {
                    router.replace(redirectTo)
                }
            }

            if (result.error) {
                toast.error(result.message)
            }
        })
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            className={className}
            disabled={isPending}
        >
            {isPending ? "Deleting..." : children}
        </button>
    )
}

export default DeleteProductBtn