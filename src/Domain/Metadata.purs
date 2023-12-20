module Domain.Metadata where

import Data.Generic.Rep (class Generic)
import Data.Show (class Show)
import Data.Show.Generic (genericShow)
import Data.Tuple (Tuple)

data Metadata = Array (Tuple String String)

derive instance genericNode :: Generic Metadata _
instance showNode :: Show Metadata where
  show = genericShow
