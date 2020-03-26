<?php 

namespace Modules\Extranet\Services\ElementTemplate\GraphQL\Mutations\Traits;


trait PageBuilderFields
{
    /**
     * savePageBuilderFields
     *
     * @param array $nodes
     * @return array 
     */
    public function savePageBuilderFields($elementTemplate, $languages, &$nodes) 
    {
        if (!$nodes) {
            return $nodes;
        }
        
        foreach ($nodes as $key => $node) {
            if(isset($node['children'])) {
                $nodes[$key]['children'] = $this->savePageBuilderFields($elementTemplate, $languages, $node['children']);
            } else {
                $field = isset($node['field']) ? $node['field'] : null;

                if($field) {
                    $fieldName = uniqid('templatefield_');
                    $value = isset($field['value']) ? $field['value'] : null;
                    $class = str_replace('|', '\\', $field['class']); // => TO REMOVE only for test
                
                    // Save field
                    (new $class)
                        ->save(
                            $elementTemplate, 
                            $fieldName, 
                            $value, 
                            $languages
                        );

                    // Replace class path and set fieldname layout structure 
                    $nodes[$key]['field']['class'] = $class;
                    $nodes[$key]['field']['fieldname'] = $fieldName;

                    // Remove node value because field handle it
                    unset($nodes[$key]['field']['value']);
                }
            }
        }
        

        return $nodes;
    }
}
