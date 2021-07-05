package obeyyourmaster

import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component

data class Demo(val name: String)

@Component
class DemoResolver : GraphQLQueryResolver {
    fun demo() = Demo("demo")
}
