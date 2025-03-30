package com.coderscampus.StudentClearanceSystem.domain;
import lombok.*;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;


@Entity
@Data
@NoArgsConstructor  // Required by JPA
@AllArgsConstructor // Needed for @Builder
@Builder
public class Authority implements GrantedAuthority {
    private static final long serialVersionUID = -6520881827973629031L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String authority;

    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id", referencedColumnName = "id")  // Explicitly specifying the column name
    private Account user;

    @Override
    public String getAuthority() {
        return authority;
    }
}

