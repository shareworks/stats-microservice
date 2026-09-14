import gql from 'graphql-tag'

export default gql`
  type AverageViews {
    """
    Average number of views per day during the last 14 days, excluding the current day.
    """
    count: UnsignedInt!
    """
    Percentage change of the average views when comparing the last 7 days with the previous 7 days.
    Might be undefined when there's not enough data to compare.
    """
    change: Float
  }

  type AverageDuration {
    """
    Average visit duration in milliseconds for the last 14 days, excluding the current day.
    """
    count: UnsignedInt!
    """
    Percentage change of the average visit duration when comparing the last 7 days with the previous 7 days.
    Might be undefined when there's not enough data to compare.
    """
    change: Float
  }

  """
  Facts about a domain. Usually simple data that can be represented in one value.
  """
  type Facts {
    """
    Facts identifier.
    """
    id: ID!
    """
    Number of visitors currently on your site.
    """
    activeVisitors(organization: ID): UnsignedInt!
    """
    Details about the average number of views.
    """
    averageViews(organization: ID, minDate: DateTime, maxDate: DateTime): AverageViews!
    """
    Details about the average visit duration.
    """
    averageDuration(organization: ID, minDate: DateTime, maxDate: DateTime): AverageDuration!
    """
    Number of unique views today.
    """
    viewsToday(organization: ID): UnsignedInt!
    """
    Number of unique views this month.
    """
    viewsMonth(organization: ID): UnsignedInt!
    """
    Number of unique views this year.
    """
    viewsYear(organization: ID): UnsignedInt!
  }

  type Query {
    """
    Facts of all domains combined. Usually simple data that can be represented in one value.
    """
    facts: Facts!
  }
`
