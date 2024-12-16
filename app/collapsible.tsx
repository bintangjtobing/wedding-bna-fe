import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface CollapsProps {
    contentTriger: string
    content: string
}

export const Collaps:React.FC<CollapsProps> = ({
    contentTriger,
    content
}) => {
    return (
        <>
            <Collapsible>
                <CollapsibleTrigger>
                    {contentTriger}
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {content}
                </CollapsibleContent>
            </Collapsible>

        </>
    )
}