module Domain.PortTarget where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)

data PortTarget = PortTarget
  { nodeId :: String
  , portId :: String
  }

derive instance genericPortTarget :: Generic PortTarget _
instance showPortTarget :: Show PortTarget where
  show = genericShow
